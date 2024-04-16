import {
	APIClient,
	FetchProvider,
	type FetchProviderOptions,
} from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";

import { type Cache, MemoryCache } from "./cache";

import { getOrCreateVAccount } from "./actions/vaccount/getOrCreate";
import { type CacheManager, IDBCache, createCacheManager } from "./cache";
import { jungle4 } from "./constants/network";
import { EffectSession } from "./session";
import type { Network } from "./types/network";

export interface ClientOpts {
	ipfsCacheDurationInMs?: number | null;
	fetchProviderOptions?: FetchProviderOptions;
	cacheImplementation?: Cache;
}

const defaultClientOpts: ClientOpts = {
	ipfsCacheDurationInMs: 600_000, // 10 minutes
};

export class Client {
	public readonly fetchProvider: FetchProvider;
	public readonly network: Network;
	public readonly options: ClientOpts;
	public readonly provider: APIClient;

	public cache: CacheManager;

	constructor(network: Network, options: ClientOpts) {
		this.options = { ...defaultClientOpts, ...options };

		this.network = network;

		this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
			fetch: options.fetchProviderOptions?.fetch ?? fetch ?? window?.fetch,
		});

		this.provider = new APIClient({ provider: this.fetchProvider });

		if (options.cacheImplementation) {
			this.cache = createCacheManager(options.cacheImplementation);
		} else if (typeof indexedDB !== "undefined") {
			this.cache = createCacheManager(new IDBCache());
		} else {
			this.cache = createCacheManager(new MemoryCache());
		}
	}

	private _session: EffectSession | null = null;

	public get session(): EffectSession | null {
		return this._session;
	}

	public setSession = async (session: Session | null) => {
		try {
			if (!session) {
				this._session = null;
				return this._session;
			}

			// Get Vaccount for this user
			const account = await getOrCreateVAccount({
				client: this,
				actor: session.actor,
				session,
			});

			this._session = session ? new EffectSession(session, account) : null;

			return this._session;
		} catch (e: unknown) {
			console.error(e);
			throw new Error("Failed to set session");
		}
	};
}

export const createClient = (network: Network, opts: ClientOpts) => {
	return new Client(network, opts);
};
