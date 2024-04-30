import {
	APIClient,
	FetchProvider,
	type FetchProviderOptions,
} from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";

import { type Cache, MemoryCache } from "./cache";

import { getOrCreateVAccount } from "./actions/vaccount/getOrCreate";
import { EffectSession } from "./session";
import type { Network } from "./types/network";
import { type CacheManager, IDBCache, createCacheManager } from "./cache";
import { chains } from "./constants/network";

export interface ClientOpts {
	ipfsCacheDurationInMs?: number | null;
	fetchProvider?: FetchProviderOptions;
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

	private _session: EffectSession | null = null;

	public get session(): EffectSession | null {
		return this._session;
	}

	constructor(network: Network, options: ClientOpts) {
		this.options = { ...defaultClientOpts, ...options };

		this.network = network;

		this.fetchProvider = new FetchProvider(this.network.eosRpcUrl, {
			fetch: this.options.fetchProvider?.fetch,
		});

		this.provider = new APIClient({ provider: this.fetchProvider });

		if (this.options.cacheImplementation) {
			this.cache = createCacheManager(this.options.cacheImplementation);
		} else if (typeof indexedDB !== "undefined") {
			this.cache = createCacheManager(new IDBCache());
		} else {
			this.cache = createCacheManager(new MemoryCache());
		}
	}

	// Set the session for the client
	public setSession = async (session: Session | null) => {
		try {
			if (!session) {
				this._session = null;
				return this._session;
			}

			// Get or create the vAccount
			const account = await getOrCreateVAccount({
				client: this,
				actor: session.actor,
				session,
			});

			// Only set the session if the vAccount was created successfully
			this._session = session ? new EffectSession(session, account) : null;

			return this._session;
		} catch (e: unknown) {
			console.error(e);
			throw new Error("Failed to set session");
		}
	};
}

export const createClient = ({
	network,
	session,
	options = {},
}: {
	network: Network;
	session: Session;
	options?: ClientOpts;
}) => {
	return new Client(network, options);
};
