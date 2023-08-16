import { Campaign } from '../types/campaign';
import { Client } from '../client';
import { UInt128 } from '@wharfkit/antelope';

export class TasksService {
    constructor(private client: Client) {}

    // TODO: Keep this one?
    async getCampaigns (): Promise<Campaign[]> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract,
        })
        return response.rows
    }

    // Or keep this one?
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
     * GetMyResercvations for account that is logged in.
     
     */

    /**
     * Call reservetask(campaign_id, account_id, quali_assets, payer, sig)
     */

};
