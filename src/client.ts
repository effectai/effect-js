import { VAccount } from "./types/user";

import {
  APIClient,
  FetchProvider,
  FetchProviderOptions,
} from "@wharfkit/antelope";
import { Session } from "@wharfkit/session";
import { jungle4 } from "./constants/network";
import { Network } from "./types/network";

export interface clientOpts {
  ipfsCacheDurationInMs?: number | null;
  fetchProviderOptions?: FetchProviderOptions;
}

export interface clientState {
  vAccount: VAccount | null;
  session: Session | null;
  setVAccount: (vAccount: VAccount) => void;
  setSession: (session: Session) => void;
}

import { StoreApi, createStore } from "zustand/vanilla";

export const testingFunction = () => {
  console.log("testing");
};

export function anotherTestingFunction() {
  console.log("another testing");
}

export class Client {
  readonly fetchProvider: FetchProvider;
  readonly network: Network;
  readonly options: clientOpts;

  public state: StoreApi<clientState>;

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

  constructor(network: Network = jungle4, options: clientOpts) {
    const defaultOptions: clientOpts = { ipfsCacheDurationInMs: 600_000 };
    this.options = { ...defaultOptions, ...options };

    this.network = network;

    this.state = createStore((set) => ({
      vAccount: null,
      session: null,
      setVAccount: (vAccount: VAccount) => set({ vAccount }),
      setSession: (session: Session) => set({ session }),
    }));

    this.state.subscribe(({ session }) => {
      console.log("[client] session changed!");
    });

    this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
      fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
    });

    this.provider = new APIClient({ provider: this.fetchProvider });
  }
}

export const createClient = (network: Network, opts: clientOpts) => {
  return new Client(network, opts);
};
