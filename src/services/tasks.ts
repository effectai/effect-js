import { Campaign } from '../types/campaign';
import { Client } from '../client';

export class TasksService {
    constructor(private client: Client) {}

    async getCampaigns (): Promise<Campaign[]> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            table: 'campaign',
            scope: this.client.config.tasksContract,
        })
        return response.rows
    }
};
