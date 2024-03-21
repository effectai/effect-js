import { ClientConfig } from './types/config';
import { VAccount } from './types/user';
import { configPresets } from './config';
import { IpfsService } from './services/ipfs';
import { TasksService } from './services/tasks';
import { VAccountService } from './services/vaccount';
import { TokenService } from './services/token';

import { APIClient, FetchProvider, FetchProviderOptions } from '@wharfkit/antelope';
import { Name, Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"
import { ActionService } from './services/actions';
import { AtomicAssetsService } from './services/atomic';
import { DaoService } from './services/dao';

export class Client {
    static __classname = 'Client'

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos: APIClient;
    session!: Session;
    vaccountId!: number;

    /**
     * Create a new Effect Network Client instance
     * @param {string} environment Which network you would like to connect to, defaults to 'jungle4'
     */
    constructor (environment: string = 'jungle4', fetchProviderOptions?: FetchProviderOptions) {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, {
            fetch : fetchProviderOptions?.fetch ?? fetch ?? window?.fetch
        });
        this.eos = new APIClient({ provider: this.fetchProvider });
    }

    tasks = new TasksService(this);
    ipfs = new IpfsService(this);
    vaccount = new VAccountService(this);
    efx = new TokenService(this);
    action = new ActionService(this);
    atomic = new AtomicAssetsService(this);
    dao = new DaoService(this);

    /**
     * Login to the Effect Network with a session
     * @param session Session object
     */
    async loginWithSession (session: Session): Promise<void> {
        this.session = session;
        const vacc: VAccount = await this.vaccount.get();
        this.vaccountId = vacc.id;
        console.log(this.vaccountId)
    }

    /**
     * Login to the Effect Network with a private key
     * @param actor EOS account name of the user
     * @param permission EOS permission of the user
     * @param privateKey EOS private key of the user
     */
    async login (actor: string, permission: string, privateKey: string): Promise<void> {
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
     * Logout from the Effect Network
     */
    logout (): void {
        // this.session = null;
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

    /**
     * Retrieve the actor and permission from the session
     * @returns [{ actor: Name; permission: Name }]
     */
    sessionAuth = (): Array<{ actor: Name; permission: Name }> => {
        if (!this.session) {
            throw new Error('Session is required for this method, please login.');
        }
        const { actor, permission } = this.session;
        return [{ actor, permission }];
    }

}
