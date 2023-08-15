import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { IpfsService } from './services/ipfs';
import { TasksService } from './services/tasks';
import { VAccountService } from './services/vaccount';

import { APIClient, APIClientOptions, FetchProvider, FetchProviderOptions } from '@wharfkit/antelope';
import { Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"

export class Client {
    static __classname = 'Client'

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos!: APIClient;
    session!: Session;

    constructor (environment: string = 'jungle4', fetchConfig?: FetchProviderOptions) {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, {
            // custom fetch or global fetch or window.fetch or error
            fetch: fetchConfig?.fetch || fetch || window.fetch || (() => { throw new Error('No fetch implementation available') })
        });
        this.eos = new APIClient({ provider: this.fetchProvider });
    }

    tasks = new TasksService(this);
    ipfs = new IpfsService(this);
    vaccount = new VAccountService(this);

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
