import { VAccount } from "./types/user";
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
import { TxState, waitForTransaction } from "./utils";
import { jungle4 } from "./constants/network";
import { Network } from "./types/network";

export interface ClientOpts {
  ipfsCache?: boolean;
  fetchProviderOptions?: FetchProviderOptions;
}

export class Client {
  readonly fetchProvider: FetchProvider;
  readonly eos: APIClient;
  readonly network: Network;
  readonly options: ClientOpts;

  public vAccountId: number | null = null;
  public session: Session | null = null;

  /**
   * Services provided by the Effect Network Client
   */

  public readonly tasks: TasksService = new TasksService(this);
  public readonly ipfs: IpfsService = new IpfsService(this);
  public readonly vaccount: VAccountService = new VAccountService(this);
  public readonly efx: TokenService = new TokenService(this);
  public readonly action: ActionService = new ActionService(this);
  public readonly atomic: AtomicAssetsService = new AtomicAssetsService(this);
  public readonly dao: DaoService = new DaoService(this);

  /**
   * Create a new Effect Network Client instance
   * @param {Network} network Which network you would like to connect to, defaults to 'jungle4'
   */

  constructor(
    network: Network = jungle4,
    options: ClientOpts = { ipfsCache: true },
  ) {
    const defaultOptions: ClientOpts = { ipfsCache: true };
    this.options = { ...defaultOptions, ...options };

    this.network = network;

    this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
      fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
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

      if (!vAccount) {
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
    const { eosRpcUrl, eosChainId } = this.network;

    this.loginWithSession(
      new Session({
        actor,
        permission,
        walletPlugin,
        chain: {
          id: eosChainId,
          url: eosRpcUrl,
        },
      }),
    );
  }

  useOptions = () => {
    const { ipfsCache } = this.options;

    return {
      ipfsCache,
    };
  };

  useConfig = () => {
    const { efx, ...rest } = this.network.config;

    return {
      contracts: efx.contracts,
      ...rest,
    };
  };

  useSession = (): {
    actor: Name;
    permission: Name;
    authorization: { actor: Name; permission: Name }[];
    transact: (...args: TransactArgs[]) => ReturnType<Session["transact"]>;
  } => {
    if (!this.session) {
      throw new SessionNotFoundError("Session is required for this method.");
    }

    //TODO:: This would be nicer to implement in a more generic way
    // e.g. integrate with Wharfkit TransactPlugin.
    const transact = async ({ ...transactArgs }) => {
      if (!this.session) {
        throw new SessionNotFoundError("Session is required for this method.");
      }

      try {
        // Start the transaction
        const transaction = await this.session.transact({
          ...transactArgs,
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
