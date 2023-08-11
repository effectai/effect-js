import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { IpfsService } from './services/ipfs';
import { TasksService } from './services/tasks';
import { APIClient, FetchProvider, FetchProviderOptions } from '@wharfkit/antelope';

export class Client {
    static __classname = 'Client'

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos!: APIClient;

    constructor (environment: string = 'jungle4', fetchConfig?: FetchProviderOptions) {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, {
            fetch: fetchConfig?.fetch || fetch || window.fetch || (() => { throw new Error('No fetch implementation available') })
        });
        this.eos = new APIClient({ provider: this.fetchProvider });
    }

    tasks = new TasksService(this);
    ipfs = new IpfsService(this);
}
