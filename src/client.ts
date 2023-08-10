import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { TasksService } from './services/tasks';
import { APIClient, APIClientOptions, FetchProvider } from '@wharfkit/antelope';

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

    tasks = new TasksService(this);
}
