import { ClientConfig } from './types/config';
import { configPresets } from './config';
import { IpfsService } from './services/ipfs';
import { TasksService } from './services/tasks';
import { VAccountService } from './services/vaccount';

import { APIClient, APIClientOptions, FetchProvider, FetchProviderOptions } from '@wharfkit/antelope';
import { Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"

import { fetch } from '@web-std/fetch'
import { efxTicker } from './types/user';

export class Client {
    static __classname = 'Client'

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos!: APIClient;
    session!: Session;

    /**
     * 
     * @param {string} environment Which network you would like to connect to, defaults to 'jungle4'
     * @param {FetchProviderOptions} fetchConfig, Supply a custom fetch config to the EffectSDK fetch provider
     */
    constructor (environment: string = 'jungle4') {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, { fetch });
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

    async efxValue (): Promise<efxTicker> {
        try {
            const efxPrice = await fetch('https://api.coingecko.com/api/v3/coins/effect-network/tickers')
            const efxPriceJson = await efxPrice.json()
            console.debug(efxPriceJson)
            const [ ticker ] = efxPriceJson.tickers
            console.debug('ticker', ticker.converted_last)
            return ticker.converted_last
        } catch (error) {
            console.error(error)
            throw new Error('Error retrieving EFX Ticker Price from CoinGecko')
        }
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
