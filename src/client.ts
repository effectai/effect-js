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

export interface ClientOpts {
	ipfsCacheDurationInMs?: number | null;
	fetchProvider?: FetchProviderOptions;
	cacheImplementation?: Cache;
}

const defaultClientOpts: ClientOpts = {
	ipfsCacheDurationInMs: 600_000, // 10 minutes
};

/**
 * Represents a client for the Effect SDK, used for interacting with the network.
 * @class Client
 * @property {FetchProvider} fetchProvider - the fetch provider for the client, allows for custtom fetch implementations.
 * @property {Network} network - the network configuration for the client.
 * @property {ClientOpts} options = additonal options for the client.
 * @property {APIClient} provider - the API client for the client.
 */
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

	/**
	 * Constructs a new instance of the Client class.
	 * @param {Network} network The network configuration for the client.
	 * @param {ClientOpts} options Additional options for the client.
	 */
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

	/**
	 * Sets the session for the client, using user credentials.
	 * @param {Session|null} session The session to set for the client.
	 * @returns {Promise<EffectSession> | null} The updated session for the client.
	 * @throws {Error} If failed to set session.
	 *
	 * ```typescript
	 * // Import the Effect Client, network configuration, and sdk function
	 * import { createClient, eos, createBatch } from "@effectai/effect-js"
	 * import { Session } from "@wharfkit/session";
	 * import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
	 *
	 * // Create a new client
	 * const client = createClient({ network: eos });
	 *
	 * // Set up wallet with privatekey
	 * const walletPlugin = new WalletPluginPrivateKey(privateKey);
	 *
	 * // Set up session with wallet and chain
	 * const session = new Session({
	 *   actor,
	 *   permission,
	 *   walletPlugin,
	 *   chain: {
	 *     id: network.eosChainId,
	 *     url: network.eosRpcUrl,
	 *   },
	 * });
	 *
	 * // Connect session to client
	 * await client.setSession(session);
	 *
	 * // Use the client to create a batch with the session
	 * await createBatch({ client, batch, data })
	 *
	 * ```
	 */
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

/**
 * Create a new client for the Effect SDK.
 * Pass in the network configuration and any additonal options.
 * Client must be used as an argument to SDK functions to interact with the network.
 *
 * @param {Object} createClientParam - The network and options for the Effect SDK client.
 * @param {Network} createClientParam.network - The network configuration for the client.
 * @param {ClientOpts} [createClientParam.options] - Additional options for the client.
 * @returns {Client} A new instance of the Client class.
 *
 * ```typescript
 * // Import the Effect Client, network configuration, and sdk function
 * import { createClient, eos, getAccountById } from "@effectai/effect-js"
 *
 * // Create a new client
 * const client = createClient({ network: eos });
 *
 * // Use the client to get an account by id
 * const accountId = 42;
 * const vAccount = await getAccountById({ client, accountId });
 * ```
 */
export const createClient = ({
	network,
	options = {},
}: {
	network: Network;
	options?: ClientOpts;
}) => {
	return new Client(network, options);
};
