import { Campaign } from './types/campaign';
import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { APIClient, APIClientOptions, FetchProvider } from '@wharfkit/antelope'

export class Client {
    static __classname = 'Client'

    readonly apiClient: APIClient;
    readonly config: ClientConfig;

    constructor (environment: string = 'jungle4') {
        this.apiClient = new APIClient({
            provider: new FetchProvider('https://jungle4.api.eosnation.io/')
        });
        this.config = configPresets[environment];
    }

    async getCampaigns (): Promise<Campaign[]> {
        const response = await this.apiClient.v1.chain.get_table_rows({
            code: 'efxforce1112',
            table: 'campaign',
            scope: 'efxforce1112',
        })
        return response.rows
    }
}
