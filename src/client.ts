import { ClientConfig } from "./types/config";
import { VAccount } from "./types/user";
import { configPresets } from "./config";
import { IpfsService } from "./services/ipfs";
import { TasksService } from "./services/tasks";
import { VAccountService } from "./services/vaccount";
import { TokenService } from "./services/token";

import {
    APIClient,
    FetchProvider,
    FetchProviderOptions,
} from "@wharfkit/antelope";
import { Name, Session, TransactArgs } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { ActionService } from "./services/actions";
import { AtomicAssetsService } from "./services/atomic";
import { DaoService } from "./services/dao";
import {
    AuthenticationError,
    SessionNotFoundError,
    TransactionError,
} from "./errors";
import { TxState, waitForTransaction } from "./services/utils";

export class Client {
    static __classname = "Client";

    readonly config: ClientConfig;
    readonly fetchProvider: FetchProvider;
    readonly eos: APIClient;

    session: Session | null = null;
    vAccountId: number | null = null;

    tasks = new TasksService(this);
    ipfs = new IpfsService(this);
    vaccount = new VAccountService(this);
    efx = new TokenService(this);
    action = new ActionService(this);
    atomic = new AtomicAssetsService(this);
    dao = new DaoService(this);

    /**
     * Create a new Effect Network Client instance
     * @param {string} environment Which network you would like to connect to, defaults to 'jungle4'
     */
    constructor(
        environment: string = "jungle4",
        fetchProviderOptions?: FetchProviderOptions,
    ) {
        this.config = configPresets[environment];
        this.fetchProvider = new FetchProvider(this.config.eosRpcUrl, {
            fetch: fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
        });
        this.eos = new APIClient({ provider: this.fetchProvider });
    }

    /**
     * Login to the Effect Network with a session
     * @param session Session object
     */
    async loginWithSession(session: Session): Promise<void> {
        try {
            this.session = session;
            const vAccount: VAccount | null = await this.vaccount.getOrCreate();

            if(!vAccount) {
                throw new AuthenticationError("Failed to login with session");
            }

            this.vAccountId = vAccount.id;

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Login to the Effect Network with a private key
     * @param actor EOS account name of the user
     * @param permission EOS permission of the user
     * @param privateKey EOS private key of the user
     */
    async login(
        actor: string,
        permission: string,
        privateKey: string,
    ): Promise<void> {
        const walletPlugin = new WalletPluginPrivateKey(privateKey);
        this.loginWithSession(
            new Session({
                actor,
                permission,
                walletPlugin,
                chain: {
                    id: this.config.eosChainId,
                    url: this.config.eosRpcUrl,
                },
            }),
        );
    }

    useSession = () : {
        actor: Name;
        permission: Name;
        authorization: { actor: Name; permission: Name }[];
    transact: ( ...args: TransactArgs[]) => ReturnType<Session["transact"]>;
    } => {
        if (!this.session) {
            throw new SessionNotFoundError(
                "Session is required for this method.",
            );
        }

        //TODO:: This would be nicer to implement in a more generic way
        // e.g. integrate with Wharfkit TransactPlugin.
        const transact = async ({ ...transact }) => {
            if (!this.session) {
                throw new SessionNotFoundError(
                    "Session is required for this method.",
                );
            }

            try {
                // Start the transaction
                const transaction = await this.session.transact({
                    ...transact,
                });

                //wait for TX to be IN BLOCK
                await waitForTransaction(
                    transaction.response!.transaction_id,
                    this.eos.v1.chain,
                    TxState.IN_BLOCK,
                );

                return transaction;
            } catch (error) {
                console.error(error);
                throw new TransactionError("Failed to transact");
            }
        };

        return {
            actor: this.session.actor,
            permission: this.session.permission,
            authorization: [
                {
                    actor: this.session.actor,
                    permission: this.session.permission,
                },
            ],
            transact,
        };
    };
}
