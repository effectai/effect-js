import { VAccount } from "./types/user";

import {
  APIClient,
  FetchProvider,
  FetchProviderOptions,
} from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";

import { jungle4 } from "./constants/network";
import { Network } from "./types/network";

import { StoreApi, createStore } from "zustand/vanilla";
import { getVAccounts } from "./actions/vaccount/getAccounts";

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
  readonly fetchProvider: FetchProvider;
  readonly network: Network;
  readonly options: ClientOpts;
  readonly provider: APIClient;

  public state: StoreApi<ClientState>;

  get session(): Session | null {
    return this.state.getState().session;
  }

  get vAccount(): VAccount | null {
    return this.state.getState().vAccount;
  }

  constructor(network: Network = jungle4, options: ClientOpts) {
    this.options = { ...defaultClientOpts, ...options };

    this.network = network;

    this.state = createStore((set) => ({
      vAccount: null,
      session: null,
      setVAccount: (vAccount: VAccount | null) => set({ vAccount }),
      setSession: async (session: Session | null) => {
        set({ session });

        //try to set the vAccount when the session changes.
        if (session) {
          const vAccounts = await getVAccounts(this, session.actor);
          set({ vAccount: vAccounts[0] });
        } else {
          set({ vAccount: null });
        }
      },
    }));

    this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
      fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
    });

    this.provider = new APIClient({ provider: this.fetchProvider });
  }
}

export const createClient = (network: Network, opts: ClientOpts) => {
  return new Client(network, opts);
};
