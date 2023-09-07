import { type Reservation, type Batch, type Campaign, type TasksSettings } from './../types/campaign'
import { type Client } from '../client'
import { UInt128, UInt32, UInt64 } from '@wharfkit/antelope'

export class TasksService {
    constructor (private readonly client: Client) {}

    // TODO: Keep this one?
    /**
     * Retrieve all campaigns published to Effect Network
     * @returns Campaign[]
     */
    async getCampaigns (): Promise<Campaign[]> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract
        })
        return response.rows
    }

    // TODO: Figure out which method works better, this `getAllCampaigns` or the `getCampaigns` above.
    // This needs to be tested when their are more campaigns on jungle.
    /**
     * Retrieve all campaigns published to Effect Network
     * @returns {Campaign[]} Promise<Campaign[]>
     */
    async getAllCampaigns (): Promise<Campaign[]> {
        const rows: Campaign[] = []
        let lowerBound: UInt128 = UInt128.from(0)
        let upperBound: UInt128 = UInt128.from(20)
        let more = true

        while (more) {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'campaign',
                scope: this.client.config.tasksContract,
                lower_bound: lowerBound,
                upper_bound: upperBound
            })

            rows.push(...response.rows)

            if (response.more) {
                const lastRow = response.rows[response.rows.length - 1]
                lowerBound = UInt128.from(lastRow.id + 1)
                upperBound = UInt128.from(lastRow.id + 21)
            } else {
                more = false
            }
        }

        return rows
    }

    /**
     * Retrieve campaign by id
     * @param id id of the campaign
     * @returns {Promise<Campaign>} Campaign
     */
    async getCampaign (id: number): Promise<Campaign> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract,
            lower_bound: UInt128.from(id),
            upper_bound: UInt128.from(id),
            limit: 1
        })

        const [campaign] = response.rows
        return campaign
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
            limit: 1
        })

        const [batch] = response.rows
        return batch
    }

    /**
     * Fetch the task data
     * Load the batch the task is in (get _task_.batch_id from the batch table)
     * Get the batch IPFS hash from batch.content.value
     * Load the IPFS object and confirm it is a JSON array. Get the _task_.task_idxth item from the array
     * Render the campaign template with that task data
     */
    async getTaskData (reservation: Reservation): Promise<any[]> {
        try {
            const batch = await this.getBatch(reservation.batch_id)
            const ipfsData = await this.client.ipfs.fetch(batch.content.field_1)

            // check if the ipfsData is an array
            if (!Array.isArray(ipfsData)) {
                throw new Error(`Task data retrieved from IPFS is not an array. \n${ipfsData}`)
            }

            // Check if there is a task at the index
            if (!ipfsData.hasOwnProperty(reservation.task_idx)) {
                throw new Error(`Task data retrieved from IPFS does not have a task at index ${reservation.task_idx}. \n${ipfsData}`)
            }

            return ipfsData[reservation.task_idx]
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    /**
      * Submit task
      * Call submittask(camapign_id, task_idx, data, account_id, sig). Note to use _task_.task_idx for the task_idx parameter (not the ID).
      *     sig (for BSC only): to avoid replay attacks, the signature is (mark)(campaign_id)(task_idx)(data). The mark value is 5.
     */
    async submitTask (campaignId: number, taskId: number, data: any): Promise<any> {}

    /**
     * Reserve next task
     * The same process as above, ~~but make sure to update last_task_done for BSC users~~
     */
    async reserveNextTask (campaignId: number, accountId: number, qualiAssets?: string[]): Promise<any> {}

    /**
     * Retrieve all reservations
     * @returns {Promise<Reservation[]>} Reservation[]
     */
    async getAllReservations (): Promise<Reservation[]> {
        try {
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                scope: this.client.config.tasksContract
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
                    upper_bound: upperBound
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
            const a = new Uint8Array(8)
            a.set(UInt32.from(campaignId).byteArray, 0)
            a.set(UInt32.from(accountId).byteArray, 4)
            const bound = UInt64.from(a)

            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                index_position: 'secondary',
                scope: this.client.config.tasksContract,
                upper_bound: bound,
                lower_bound: bound
            })

            const [reservation] = response.rows
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
            const a = new Uint8Array(8)
            a.set(UInt32.from(campaignId).byteArray, 0)
            a.set(UInt32.from(vaccount.id).byteArray, 4)
            const bound = UInt64.from(a)

            const response = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.tasksContract,
                table: 'reservation',
                index_position: 'secondary',
                scope: this.client.config.tasksContract,
                upper_bound: bound,
                lower_bound: bound
            })

            const [reservation] = response.rows
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
        this.client.requireSession()

        const myReservation = await this.getMyReservation(campaignId)
        if (myReservation !== undefined) {
            return myReservation
        } else {
            const vacc = await this.client.vaccount.get()
            await this.client.session.transact({
                action: {
                    account: this.client.config.tasksContract,
                    name: 'reservetask',
                    authorization: [{
                        actor: this.client.session.actor,
                        permission: this.client.session.permission
                    }],
                    data: {
                        campaign_id: campaignId,
                        account_id: vacc.id,
                        quali_assets: qualiAssets,
                        payer: this.client.session.actor,
                        sig: null
                    }
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
            index_position: 'secondary' // TODO: Which index do I need to have?
            // key_type: 'sha256', // TODO: Is this needed? if this is set than the lowerbound needs to be of type Checksum
        })

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
            index_position: 'primary'

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
                table: 'settings'
            })
            const [config] = response.rows
            return config
        } catch (error) {
            console.error(error)
            throw new Error('Error retrieving Force settings')
        }
    }
}
