import { Campaign, Reservation } from '../types/campaign';
import { Client } from '../client';
import { UInt128 } from '@wharfkit/antelope';

export class TasksService {
    constructor(private client: Client) {}

    // TODO: Keep this one?
    /**
     * Retrieve all campaigns published to Effect Network
     * @returns Campaign[]
     */
    async getCampaigns (): Promise<Campaign[]> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract,
        })
        return response.rows
    }

    // TODO: Figure out which method works better, this `getAllCampaigns` or the `getCampaigns` above.
    // This needs to be tested when their are more campaigns on jungle.
    // Not sure how well wharfkit handles setting the limit to -1.
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
                upper_bound: upperBound,
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
            limit: 1,
        })

        const [campaign] = response.rows
        return campaign
    }

    /**
     * Fetch the task data
     * Load the batch the task is in (get _task_.batch_id from the batch table)
     * Get the batch IPFS hash from batch.content.value
     * Load the IPFS object and confirm it is a JSON array. Get the _task_.task_idxth item from the array
     * Render the campaign template with that task data
     */
    async getTask (campaignId: number, taskId: number): Promise<any> {}

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
     * TODO: add type for reservation
     * GetReservations
     * Find active reservations
     * To find all users reservation: filter the reservation table by account_id (index = 3)
     * To find the user reservation in a campaign: filter on acccamp (index 1) with composite index (uint64_t{account_id.value()} << 32) | campaign_id
     */
    async getActiveReservations (campaignId: number): Promise<any> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'reservation',
            scope: this.client.config.tasksContract,
            limit: -1
        })

        const [reservation] = response.rows
        return reservation
    }

    /**
     * TODO: Retrieve all reservations.
     */
    async getAllReservations (): Promise<any> {}

    /**
     * Get Campaign Reservations
     * To find the user reservation in a campaign: filter on acccamp (index 1) with composite index (uint64_t{account_id.value()} << 32) | campaign_id
     */
    async getCampaignReservations (campaignId: number, accountId): Promise<any> {}


    /**
     * TODO: Add type for user
     * GetMyResercvations for account that is logged in.
     * To find all users reservation: filter the reservation table by account_id (index = 3)
     * To find the user reservation in a campaign: filter on acccamp (index 1) with composite index (uint64_t{account_id.value()} << 32) | campaign_id
     */

    // const accTaskIdxReservation = await this.client.eos.v1.chain.get_table_rows({
    //     code: this.client.config.tasksContract,
    //     table: 'acctaskidx',
    //     scope: this.client.config.tasksContract,
    //     index_position: 'tertiary',
    //     lower_bound: UInt128.from(this.client.vaccount.getAll()),
    //     upper_bound: UInt128.from(this.client.vaccount.getAll()),
    // })

    // console.log('accTaskIdxReservation', accTaskIdxReservation)
    // const [reservation] = accTaskIdxReservation.rows
    // return reservation

    async getMyReservation (campaignId: number): Promise<Reservation> {
        // Make sure user is logged in
        this.client.requireSession()

        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'reservation',
            scope: this.client.config.tasksContract,
            index_position: 'tertiary',
        })

        console.log(response)

        const accReservation = response.rows.find((row: Reservation) => row.account_id === this.client.session.)
        return accReservation
    }

    /**
     * Reserve a task, will check if the user already has a reservation for this campaign and return it, if not will create a new reservation and return it.
     * @param campaignId id of the campaign
     * @param qualiAssets can be null, then the smart contract will search through all the assets of the user.
     * @returns {Promise<Reservation>} Reservation
     */
    async reserveTask (campaignId: number, qualiAssets?: string[]): Promise<Reservation> {
        try {
            // Make sure user is logged in
            this.client.requireSession()

            const myReservation = await this.getMyReservation(campaignId)
            if (myReservation) {
                return myReservation
            } else {
                const action = {
                    account: this.client.config.tasksContract,
                    name: 'reservetask',
                    authorization: [{
                        actor: this.client.session.actor,
                        permission: this.client.session.permission,
                    }],
                    data: {
                        campaign_id: campaignId,
                        account_id: this.client.session.actor,
                        quali_assets: qualiAssets,
                        payer: this.client.session.actor,
                        sig: null,
                    },
                }
                await this.client.session.transact({ action })

                // TODO: Sleep for a bit for now, use finality plugin later.
                await new Promise(resolve => setTimeout(resolve, 3000))

                return await this.getMyReservation(campaignId)
            }
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}
