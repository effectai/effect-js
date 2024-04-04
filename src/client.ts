import { VAccount } from "./types/user";

import {
  APIClient,
  FetchProvider,
  FetchProviderOptions,
} from "@wharfkit/antelope";
import type {
  Name,
  PermissionLevelType,
  Session,
  TransactArgs,
} from "@wharfkit/session";

import { jungle4 } from "./constants/network";
import { Network } from "./types/network";
import { TransactionError } from "./errors";
import { TxState, waitForTransaction } from "./utils";

export interface ClientOpts {
  ipfsCacheDurationInMs?: number | null;
  fetchProviderOptions?: FetchProviderOptions;
}

const defaultClientOpts: ClientOpts = {
  ipfsCacheDurationInMs: 600_000, // 10 minutes
};

export interface ClientState {
  vAccount: VAccount | null;
  session: Session | null;
  setVAccount: (vAccount: VAccount | null) => void;
  setSession: (session: Session | null) => void;
}

export class Client {
  public readonly fetchProvider: FetchProvider;
  public readonly network: Network;
  public readonly options: ClientOpts;
  public readonly provider: APIClient;

  constructor(network: Network = jungle4, options: ClientOpts) {
    this.options = { ...defaultClientOpts, ...options };

    this.network = network;

    this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
      fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
    });

    this.provider = new APIClient({ provider: this.fetchProvider });
  }

  private _session: EffectSession | null = null;

  public get session(): EffectSession | null {
    return this._session;
  }

  public setSession = (session: Session | null) => {
    this._session = session ? new EffectSession(session) : null;
  };
}

export class EffectSession {
  public readonly actor: Name;
  public readonly permission: Name;
  public readonly permissionLevel: PermissionLevelType;
  public readonly wharfKitSession: Session;
  public readonly authorization: { actor: Name; permission: Name }[];

  private _vAccount: VAccount | null;

  get vAccount(): VAccount | null {
    return this._vAccount;
  }

  constructor(session: Session) {
    this.actor = session.actor;
    this.permission = session.permission;
    this.permissionLevel = session.permissionLevel;
    this.wharfKitSession = session;
    this.authorization = [{ actor: this.actor, permission: this.permission }];

    this._vAccount = null;
  }

  public transact = async (args: TransactArgs) => {
    try {
      // Start the transaction
      const transaction = await this.wharfKitSession.transact({
        ...args,
      });

      //wait for TX to be IN BLOCK
      await waitForTransaction(
        transaction.response!.transaction_id,
        this.wharfKitSession.client.v1.chain,
        TxState.IN_BLOCK,
      );

      return transaction;
    } catch (error) {
      console.error(error);
      throw new TransactionError("Failed to transact");
    }
  };

  setVAccount = (vAccount: VAccount) => {
    this._vAccount = vAccount;
  };
}

export const createClient = (network: Network, opts: ClientOpts) => {
  return new Client(network, opts);
};
