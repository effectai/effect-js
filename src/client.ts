import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { TasksService } from './services/tasks';
import { APIClient, APIClientOptions, FetchProvider } from '@wharfkit/antelope';
import { Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"

export class Client {
    static __classname = 'Client'

    readonly eos: APIClient;
    readonly config: ClientConfig;

    session!: Session;

    constructor (environment: string = 'jungle4') {
        this.config = configPresets[environment];
        this.eos = new APIClient({
            provider: new FetchProvider(this.config.eosRpcUrl)
        });
    }

    tasks = new TasksService(this);

    login (actor: string, permission: string, privateKey: string) {
        const walletPlugin = new WalletPluginPrivateKey(privateKey);
        this.session = new Session({
            actor: actor,
            permission: permission,
            chain: {
                id: this.config.eosChainId,
                url: this.config.eosRpcUrl,
            },
            walletPlugin,
        });
    }
}
