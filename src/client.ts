import { Campaign } from './types/campaign';
import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { APIClient, APIClientOptions, FetchProvider } from '@wharfkit/antelope'

export class Client {
  static __classname = 'Client'

  readonly eos: APIClient;
  readonly config: ClientConfig;

  constructor (environment: string = 'jungle4') {
    this.config = configPresets[environment];
    this.eos = new APIClient({
      provider: new FetchProvider(this.config.eosRpcUrl)
    });
  }

  async getCampaigns (): Promise<Campaign[]> {
    const response = await this.eos.v1.chain.get_table_rows({
      code: this.config.tasksContract,
      table: 'campaign',
      scope: this.config.tasksContract,
    })
    return response.rows
  }
}
