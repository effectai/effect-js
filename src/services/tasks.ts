import { Campaign } from '../types/campaign';
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

    /**
     * Retrieve all campaigns published to Effect Network
     * @returns Campaign[]
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
                lowerBound = UInt128.from(lastRow.id + 1) as unknown as UInt128
                upperBound = UInt128.from(lastRow.id + 21) as unknown as UInt128
            } else {
                more = false
            }
        }

        return rows
    }

    /**
     * 
     * @param id id of the campaign
     * @returns Campaign
     */
    async getCampaign (id: number): Promise<Campaign> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract,
            lower_bound: UInt128.from(id as unknown as string),
            upper_bound: UInt128.from(id as unknown as string),
            limit: 1,
        })

        const [campaign] = response.rows
        return campaign
    }

    /**
     * TODO: add type for reservation
     * GetReservations
     */
    async getReservations (campaignId: number): Promise<any> {
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
     * TODO: Add type for user
     * GetMyResercvations for account that is logged in.
     */
    async getMyReservations (campaignId: number): Promise<any> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'reservation',
            scope: this.client.config.tasksContract,
            limit: -1,
            index_position: 3,
        })

        // TODO check if this account_name is correct
        response.rows.find((row: any) => row.acccamp === this.client.session.actor)

        const [reservation] = response.rows
        return reservation
    }

    /**
     * Call reservetask(campaign_id, account_id, quali_assets, payer, sig)
     */
    async reserveTask (campaignId: number, accountId: number, qualiAssets?: string[]): Promise<any> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'account_id',
            scope: this.client.config.tasksContract,
            limit: -1,
            index_position: 'tertiary',
        })

        const [reservation] = response.rows
        return reservation
    }

};
