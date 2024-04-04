import { VAccount } from "./types/user";

import {
  APIClient,
  FetchProvider,
  FetchProviderOptions,
} from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";

import { jungle4 } from "./constants/network";
import { Network } from "./types/network";
import { createVAccount, getVAccounts } from "./exports";
import { EffectSession } from "./session";

export interface ClientOpts {
  ipfsCacheDurationInMs?: number | null;
  fetchProviderOptions?: FetchProviderOptions;
}

const defaultClientOpts: ClientOpts = {
  ipfsCacheDurationInMs: 600_000, // 10 minutes
};

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

  public setSession = async (session: Session | null) => {
    try {
      this._session = session ? new EffectSession(session) : null;
      // after setting the session, also try to set the vAccount
      if (this._session) {
        let [account] = await getVAccounts(this, this._session.actor);

        if (!account) {
          // create a vAccount for this user.
          await createVAccount(this, this._session.actor);
          [account] = await getVAccounts(this, this._session.actor);
        }

        this._session.setVAccount(account);
      }
    } catch (e: unknown) {
      console.error(e);
      throw new Error("Failed to set session");
    }
  };
}

export const createClient = (network: Network, opts: ClientOpts) => {
  return new Client(network, opts);
};
