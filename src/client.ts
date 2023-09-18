import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { IpfsService } from './services/ipfs';
import { TasksService } from './services/tasks';
import { VAccountService } from './services/vaccount';
import { TokenService } from './services/token';

import { APIClient, FetchProvider } from '@wharfkit/antelope';
import { Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"

export class Client {
    static __classname = 'Client'

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos!: APIClient;
    session!: Session;

    /**
     * Create a new Effect Network Client instance
     * @param {string} environment Which network you would like to connect to, defaults to 'jungle4'
     */
    constructor (environment: string = 'jungle4', fetchProvider?: FetchProvider) {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, {
            fetch : fetch || window.fetch || fetchProvider
        });
        this.eos = new APIClient({ provider: this.fetchProvider });
    }

    tasks = new TasksService(this);
    ipfs = new IpfsService(this);
    vaccount = new VAccountService(this);
    efx = new TokenService(this);

    /**
     * Login to the Effect Network with a session
     * @param session Session object
     */
    loginWithSession (session: Session): void {
        this.session = session;
    }

    /**
     * Login to the Effect Network with a private key
     * @param actor EOS account name of the user
     * @param permission EOS permission of the user
     * @param privateKey EOS private key of the user
     */
    login (actor: string, permission: string, privateKey: string): void {
        const walletPlugin = new WalletPluginPrivateKey(privateKey);
        this.loginWithSession(new Session({
            actor,
            permission,
            walletPlugin,
            chain: {
                id: this.config.eosChainId,
                url: this.config.eosRpcUrl,
            },
        }));
    }

    /**
     * Check if the user is logged in
     * @returns {boolean} Whether or not the user is logged in
     */
    isLoggedIn (): boolean {
        return this.session === undefined && this.session === null;
    }

    /**
     * Require a session to be set (make sure user is logged in), otherwise throw an error.
     */
    requireSession (): void {
        if (!this.session) {
            throw new Error('Session is required for this method, please login.');
        }
    }
}
