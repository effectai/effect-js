import { VAccount } from "./types/user";

import {
  APIClient,
  FetchProvider,
  FetchProviderOptions,
} from "@wharfkit/antelope";
import { Session } from "@wharfkit/session";
import { jungle4 } from "./constants/network";
import { Network } from "./types/network";

export interface ClientOpts {
  ipfsCacheDurationInMs?: number | null;
  fetchProviderOptions?: FetchProviderOptions;
}

export interface ClientState {
  vAccount: VAccount | null;
  session: Session | null;
  setVAccount: (vAccount: VAccount | null) => void;
  setSession: (session: Session | null) => void;
}

import { StoreApi, createStore } from "zustand/vanilla";
import { getVAccounts, watchSession } from "./actions";

export class Client {
  readonly fetchProvider: FetchProvider;
  readonly network: Network;
  readonly options: ClientOpts;

  public state: StoreApi<ClientState>;
  public provider: APIClient;

  get session(): Session | null {
    return this.state.getState().session;
  }

  get vAccount(): VAccount | null {
    return this.state.getState().vAccount;
  }

  /**
   * Create a new Effect Network Client instance
   * @param {Network} network Which network you would like to connect to, defaults to 'jungle4'
   */

  constructor(network: Network = jungle4, options: ClientOpts) {
    const defaultOptions: ClientOpts = { ipfsCacheDurationInMs: 600_000 };
    this.options = { ...defaultOptions, ...options };

    this.network = network;

    this.state = createStore((set) => ({
      vAccount: null,
      session: null,
      setVAccount: (vAccount: VAccount | null) => set({ vAccount }),
      setSession: (session: Session | null) => set({ session }),
    }));

    //subscribe to session changes
    watchSession(this, async (session) => {
      console.log("Session changed", session);
      // If there is a session, set the vAccount
    });

    this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
      fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
    });

    this.provider = new APIClient({ provider: this.fetchProvider });
  }
}

export const createClient = (network: Network, opts: ClientOpts) => {
  return new Client(network, opts);
};
