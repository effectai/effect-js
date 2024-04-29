import { PrivateKey, type PrivateKeyType, Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, eos } from "../src/exports";
import { createClient } from "./../src/client";
import type { Client } from "./../src/client";
import type { Network } from "./types/network";

declare module "bun" {
	interface Env {
		TESTNET_PERMISSION: string;
		TESTNET_NETWORK_NAME: string;
		TESTNET_ACTOR: string;
		TESTNET_PRIVATE_KEY: string;
		MAINNET_PERMISSION: string;
		MAINNET_NETWORK_NAME: string;
		MAINNET_ACTOR: string;
		MAINNET_PRIVATE_KEY: string;
	}
}

export interface testEnv {
	network: Network;
	networkName: string;
	permission: string;
	actor: string;
	privateKey: PrivateKeyType;
}

export const destructureEnv = (networkEnv: Network) => {
	// Mainnet Config
	if (networkEnv === eos) {
		return {
			network: eos,
			networkName: process.env.MAINNET_NETWORK_NAME,
			permission: process.env.MAINNET_PERMISSION,
			actor: process.env.MAINNET_ACTOR,
			privateKey: PrivateKey.from(process.env.MAINNET_PRIVATE_KEY),
		};
	}

	// Testnet Config
	return {
		network: jungle4,
		networkName: process.env.TESTNET_NETWORK_NAME,
		permission: process.env.TESTNET_PERMISSION,
		actor: process.env.TESTNET_ACTOR,
		privateKey: PrivateKey.from(process.env.TESTNET_PRIVATE_KEY),
	};
};

export const testClientSession = async ({
	testEnvNetwork,
}: { testEnvNetwork: Network }): Promise<Client> => {
	// Retrieve parameters for session.
	const { network, permission, actor, privateKey } =
		destructureEnv(testEnvNetwork);
	const { eosRpcUrl: url, eosChainId: id } = network;

	// Create client
	const client = createClient({ network });

	// Set up wallet with privatekey
	const walletPlugin = new WalletPluginPrivateKey(privateKey);

	// Set up session with wallet and chain
	const session = new Session({
		actor,
		permission,
		walletPlugin,
		chain: { id, url },
		permissionLevel: { actor, permission },
	});

	// Connect session to client
	await client.setSession(session);

	return client;
};
