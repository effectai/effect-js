import { Reservation, Batch, Campaign, TasksSettings, InitCampaign, InitBatch, RepsDone } from './../types/campaign';
import { Client } from '../client';
import { UInt128, UInt32, UInt64 } from '@wharfkit/antelope';
import { Asset, TransactResult } from '@wharfkit/session';
import { validateBatchData } from './utils';

export class TasksService {
    constructor(private client: Client) {}

    // TODO: https://wharfkit.com/guides/contract-kit/reading-tables
    // This needs to be tested when their are more campaigns on jungle.
    /**
     * Retrieve all campaigns published to Effect Network
     * @returns {Campaign[]} Promise<Campaign[]>
     */
    async getAllCampaigns (ipfsFetch: boolean = true): Promise<Campaign[]> {
        const rows: Campaign[] = []
        const boundDelta = 20
        let lowerBound: UInt128 = UInt128.from(0)
        let upperBound: UInt128 = UInt128.from(boundDelta)
        let more = true

        while (more) {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'campaign',
                scope: this.client.config.tasksContract,
                lower_bound: lowerBound,
                upper_bound: upperBound,
            })

            rows.push(...response.rows)

            if (response.more) {
                const lastRow = response.rows[response.rows.length - 1]
                lowerBound = UInt128.from(lastRow.id + 1)
                upperBound = UInt128.from(lastRow.id + boundDelta )
            } else {
                more = false
            }
        }

        if (ipfsFetch) {
            for (const campaign of rows) {
                campaign.info = await this.client.ipfs.fetch(campaign.content.field_1)
            }
        }

        return rows
    }

    /**
     * Retrieve campaign by id
     * @param id id of the campaign
     * @returns {Promise<Campaign>} Campaign
     */
    async getCampaign (id: number, fetchIpfs: boolean = true): Promise<Campaign> {
        try {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'campaign',
                scope: this.client.config.tasksContract,
                lower_bound: UInt128.from(id),
                upper_bound: UInt128.from(id),
                limit: 1,
            })
    
            const [ campaign ]: Campaign[] = response.rows
    
            if (campaign === undefined) {
                throw new Error(`Campaign with id ${id} not found`)
            }
    
            if (fetchIpfs) {
                campaign.info = await this.client.ipfs.fetch(campaign.content.field_1)
            }
            return campaign
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Create a new campaign
     * @param campaign InitCampaign
     */
    async makeCampaign (campaign: InitCampaign): Promise<TransactResult> {
        const authorization = this.client.sessionAuth()
        try {
            const hash = await this.client.ipfs.upload(campaign.info)
            const response = await this.client.session.transact({
                action: {
                    account: this.client.config.tasksContract,
                    name: 'mkcampaign',
                    authorization,
                    data: {
                        owner: this.client.session.actor,
                        content: { field_0: 0, field_1: hash },
                        max_task_time: campaign.max_task_time,
                        reward: { quantity: campaign.quantity, contract: this.client.config.tokenContract },
                        qualis: campaign.qualis ?? [],
                        payer: this.client.session.actor,
                    },
                }
            })
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Retrieve Batch by id
     * @param id id of the batch
     * @returns {Promise<Batch>} Batch
     */
    async getBatch (batchId: number): Promise<Batch> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'batch',
            scope: this.client.config.tasksContract,
            lower_bound: UInt128.from(batchId),
            upper_bound: UInt128.from(batchId),
            limit: 1,
        })

        const [batch] = response.rows
        return batch
    }

    /**
     * Create batch
     */
    async makeBatch (initBatch: InitBatch): Promise<any> {
        this.client.requireSession()

        try {
            const vacc = await this.client.vaccount.get()
            const campaign = await this.getCampaign(initBatch.campaign_id)
            const assetQuantity = Asset.from(campaign.reward.quantity)
            const batchPrice = assetQuantity.value * initBatch.repetitions

            // Check if the user has enough funds to pay for the batch
            // if (Asset.from(vacc.balance.quantity).value < batchPrice) {
            //     throw new Error('Not enough funds in vAccount to pay for batch')
            // }

            // Validate the batch before uploading, will throw error
            if (campaign.info?.input_schema) {
                validateBatchData(initBatch, campaign)
            }

            const newBatchId = campaign.num_batches + 1
            const hash = await this.client.ipfs.upload(initBatch.data)
            const makeBatch = await this.client.action.makeBatchAction(initBatch, hash)
            const vTransfer = this.client.action.vTransferAction(vacc, batchPrice)
            const publishBatch = this.client.action.publishBatchAction(newBatchId, initBatch.repetitions) // TODO Check if batchId is correct.

            let actions: any[]

            if (Asset.from(vacc.balance.quantity).value < batchPrice) {
                const depositAction = this.client.action.depositAction(assetQuantity.value, vacc)
                actions = [depositAction, makeBatch, vTransfer, publishBatch]
            } else {
                actions = [makeBatch, vTransfer, publishBatch]
            }

            const response = await this.client.session.transact({ actions })
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Fetch the task data
     * Load the batch the task is in (get _task_.batch_id from the batch table)
     * Get the batch IPFS hash from batch.content.value
     * Load the IPFS object and confirm it is a JSON array. Get the _task_.task_idxth item from the array
     * Render the campaign template with that task data
     */
    async getTaskData(reservation: Reservation): Promise<any> {
        try {
            const batch = await this.getBatch(reservation.batch_id);
            const ipfsData = await this.client.ipfs.fetch(batch.content.field_1);

            // check if the ipfsData is an array
            if (!Array.isArray(ipfsData)) {
                throw new Error(`Task data retrieved from IPFS is not an array. \n${String(ipfsData)}`);
            }

            // Check if there is a task at the index
            const taskIndex = reservation.task_idx;
            if (ipfsData.length <= taskIndex || taskIndex < 0) {
                throw new Error(`Task data retrieved from IPFS does not have a task at index ${taskIndex}. \n${JSON.stringify(ipfsData)}`);
            }

            return ipfsData[taskIndex];
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    /**
     * Task availability
     * TODO: This is a WIP
     */
    async taskAvailable (reservation: Reservation): Promise<boolean> {
        try {
            const batch = await this.getBatch(reservation.batch_id)

            // Is it true that when the num_tasks is equal to the task_idx that the batch there is still work to be done in the batch?
            // How is this affected when there are more than 1 batches?
            // How is this affected when there are more reps?
            // Does num_tasks change when new tasks are added or removed?
            return batch.num_tasks >= reservation.task_idx
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Get repitions done for a task in a campaign.
     */
    async getAllRepsDone (): Promise<RepsDone[]> {
        try {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'repsdone',
                scope: this.client.config.tasksContract,
            })
            return response.rows
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
      * Submit task
      * Call submittask(camapign_id, task_idx, data, account_id, sig). Note to use _task_.task_idx for the task_idx parameter (not the ID).
      *     sig (for BSC only): to avoid replay attacks, the signature is (mark)(campaign_id)(task_idx)(data). The mark value is 5.
     */
    async submitTask (reservation: Reservation, data: any): Promise<TransactResult> {   
        const authorization = this.client.sessionAuth()
        try {
            const ipfsData = await this.client.ipfs.upload(data)
            const response = await this.client.session.transact({
                action: {
                    account: this.client.config.tasksContract,
                    name: 'submittask',
                    authorization,
                    data: {
                        campaign_id: UInt32.from(reservation.campaign_id),
                        account_id: UInt32.from(reservation.account_id),
                        task_idx: UInt32.from(reservation.task_idx),
                        data: ipfsData,
                        payer: this.client.session.actor,
                        sig: null,
                    },
                }
            });
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * 
     */
    getAllAccTaskIdx = async (): Promise<any> => {
        try {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'acctaskidx',
                scope: this.client.config.tasksContract,
            })
            // console.debug('getAllAccTaskIdx', response)
            return response.rows
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Retrieve all reservations
     * @returns {Promise<Reservation[]>} Reservation[]
     */
    async getAllReservations (): Promise<Reservation[]> {
        try {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                scope: this.client.config.tasksContract,
            })

            while (response.more) {
                const lastRow = response.rows[response.rows.length - 1]
                const lowerBound = UInt64.from(lastRow.id + 1)
                const upperBound = UInt64.from(lastRow.id + 21)
                const moreResponse = await this.client.eos.v1.chain.get_table_rows({
                    code: this.client.config.tasksContract,
                    table: 'reservation',
                    scope: this.client.config.tasksContract,
                    lower_bound: lowerBound,
                    upper_bound: upperBound,
                })
                response.rows.push(...moreResponse.rows)
                response.more = moreResponse.more
            }

            return response.rows
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Get Campaign Reservation for user
     * @param campaignId id of the campaign
     * @param accountId id of the account
     * @returns {Promise<Reservation>} Reservation
     */
    async getCampaignReservation (campaignId: number, accountId: number): Promise<Reservation> {
        try {
            // create a composite Uint64 key from two Uint32 keys
            const a = new Uint8Array(8);
            a.set(UInt32.from(campaignId).byteArray, 0);
            a.set(UInt32.from(accountId).byteArray, 4);
            const bound = UInt64.from(a)

            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                index_position: 'secondary',
                scope: this.client.config.tasksContract,
                upper_bound: bound,
                lower_bound: bound,
            })

            const [ reservation ] = response.rows
            return reservation
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Get the reservation of logged in user for a campaign.
     * @param campaignId id of the campaign
     * @returns {Promise<Reservation>} Reservation
     */
    async getMyReservation (campaignId: number): Promise<Reservation> {
        try {
            this.client.requireSession()
            const vaccount = await this.client.vaccount.get()

            // create a composite Uint64 key from two Uint32 keys
            const a = new Uint8Array(8);
            a.set(UInt32.from(campaignId).byteArray, 0);
            a.set(UInt32.from(vaccount.id).byteArray, 4);
            const bound = UInt64.from(a)

            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                index_position: 'secondary',
                scope: this.client.config.tasksContract,
                upper_bound: bound,
                lower_bound: bound,
            })

            const [ reservation ] = response.rows
            return reservation
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Reserve a task, will check if the user already has a reservation for this campaign and return it, if not will create a new reservation and return it.
     * @param campaignId id of the campaign
     * @param qualiAssets can be null, then the smart contract will search through all the assets of the user.
     * @returns {Promise<Reservation>} Reservation
     *
     * ```mermaid
     * sequenceDiagram
     *  participant User
     *  participant Client
     *  participant Smart Contract
     *  User->>Client: Login
     *  Client->>Smart Contract: reserveTask(campaignId, qualiAssets)
     *  Smart Contract->>Smart Contract: Check if user already has a reservation for this campaign
     *  Smart Contract->>Smart Contract: If not, create a new reservation
     *  Smart Contract->>Client: Return reservation
     *  Client->>User: Return reservation
     * ```
     */
    async reserveTask (campaignId: number, qualiAssets?: string[]): Promise<Reservation> {
        const authorization = this.client.sessionAuth()
        const myReservation = await this.getMyReservation(campaignId)
        if (myReservation) {
            return myReservation
        } else {
            const vacc = await this.client.vaccount.get()
            await this.client.session.transact({
                action: {
                    account: this.client.config.tasksContract,
                    name: 'reservetask',
                    authorization,
                    data: {
                        campaign_id: campaignId,
                        account_id: vacc.id,
                        quali_assets: qualiAssets,
                        payer: this.client.session.actor,
                        sig: null,
                    },
                }
            })

            // TODO: Sleep for a bit for now, use finality plugin later.
            await new Promise(resolve => setTimeout(resolve, 3000))

            return await this.getMyReservation(campaignId)
        }
    }

    /**
     * Retrieve Effect Network Qualification NFT for user.
     * @param accountId id of the account
     * @returns {Promise<Qualification>} Qualification NFT
     */
    async getQualifications (accountId: number): Promise<any[]> {
        // We should look at the current implementation for how AtomicAssets implemented this.
        // We can mock this by using atomic assets nfts on jungle

        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            table: 'assets',
            scope: this.client.config.atomicAssetsContract,
            limit: 50,
            upper_bound: UInt128.from(accountId), // TODO: What bounds do I need to set?
            lower_bound: UInt128.from(accountId), // TODO: What bounds do I need to set?
            index_position: 'secondary', // TODO: Which index do I need to have?
            // key_type: 'sha256', // TODO: Is this needed? if this is set than the lowerbound needs to be of type Checksum
        });

        return response.rows
    }

    /**
     * TODO: Figure out the interface for a Qualification NFT Asset
     * Retrieve Effect Network Qualification NFT Collection
     *
     */
    async getQualificationCollection (): Promise<any> {
        const bounds: string = 'effect.network'

        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            table: 'collections',
            scope: this.client.config.atomicAssetsContract,
            limit: 1,
            upper_bound: UInt128.from(1),
            lower_bound: UInt128.from(1),
            index_position: 'primary',
        })
    }

    /**
     * Get payout delay
     * @returns the payout delay in seconds
     * @throws error if the payout delay is not available
     */
        getForceSettings = async (): Promise<TasksSettings> => {
            try {
                const response = await this.client.eos.v1.chain.get_table_rows({
                    code: this.client.config.tasksContract,
                    scope: this.client.config.tasksContract,
                    table: 'settings',
                })
                const [config] = response.rows
                return config
            } catch (error) {
                console.error(error)
                throw new Error('Error retrieving Force settings')
            }
        }
}
