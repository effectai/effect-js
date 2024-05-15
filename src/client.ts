import {
	APIClient,
	FetchProvider,
	type FetchProviderOptions,
} from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";
import type { Network } from "./types/network";
import { type Cache, MemoryCache } from "./cache";
import { type CacheManager, IDBCache, createCacheManager } from "./cache";
import { getOrCreateVAccount } from "./actions/vaccount/getOrCreate";
import { EffectSession } from "./session";
import { networks } from "./constants/network";

export interface ClientOpts {
	ipfsCacheDurationInMs?: number | null;
	fetchProvider?: FetchProviderOptions;
	cacheImplementation?: Cache;
}

const defaultClientOpts: ClientOpts = {
	ipfsCacheDurationInMs: 600_000, // 10 minutes
};

export class Client {
	public readonly fetchProvider: FetchProvider; // fetch provider for the client
	public readonly network: Network; // network configuration for the client
	public readonly options: ClientOpts; // additional options for the client
	public readonly provider: APIClient; // API client for the client

	public cache: CacheManager;

	private _session: EffectSession | null = null;

	public get session(): EffectSession | null {
		return this._session;
	}

	constructor(network: Network, options: ClientOpts) {
		this.options = { ...defaultClientOpts, ...options };

		this.network = network;

		this.fetchProvider = new FetchProvider(this.network.url, {
			fetch: this.options.fetchProvider?.fetch,
		});

		this.provider = new APIClient({ provider: this.fetchProvider });

		if (this.options.cacheImplementatiuseon) {
			this.cache = createCacheManager(this.options.cacheImplementation);
		} else if (typeof indexedDB !== "undefined") {
			this.cache = createCacheManager(new IDBCache());
		} else {
			this.cache = createCacheManager(new MemoryCache());
		}
	}

	public setSession = async (
		session: Session | null,
	): Promise<EffectSession | null> => {
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

export type CreateClientArgs = {
	network?: Network;
	session?: Session;
	options?: ClientOpts;
} & ({ network: Network } | { session: Session });

export const createClient = ({
	network,
	session,
	options = {},
}: CreateClientArgs) => {
	if (!network && !session) {
		throw new Error(
			"Network or Session configuration is required to create a client.",
		);
	}

	// TODO: We should also check that network and session.network are the same
	if (session) {
		// if session is given here, retrieve the network from session

		const chain = networks.find(
			(network) => network.id === session.chain.id.hexString,
		);

		if (!chain)
			throw new Error(
				"Chain associated with session not found or not supported.",
			);

		const client = new Client(chain, options);

		// automatically set the session whenever the session is provided
		client.setSession(session);

		return client;
	}

	if (!network) {
		throw new Error("Network configuration is required to create a client.");
	}

	return new Client(network, options);
};
