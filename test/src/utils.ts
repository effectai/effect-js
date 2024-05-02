import {
	PrivateKey,
	type PrivateKeyType,
	Session,
	PermissionLevel,
} from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, eos } from "../../src/exports";
import { createClient } from "../../src/client";
import type { Client } from "../../src/client";
import type { Network } from "../../src/types/network";

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
	return {
		network: jungle4,
		networkName: process.env.NETWORK_NAME,
		permission: process.env.PERMISSION!,
		actor: process.env.ACTOR!,
		privateKey: PrivateKey.from(process.env.PRIVATE_KEY!),
	};
};

export const testClientSession = async ({
	testEnvNetwork,
}: { testEnvNetwork: Network }): Promise<Client> => {
	// Retrieve parameters for session.
	const { network, permission, actor, privateKey } =
		destructureEnv(testEnvNetwork);

	if (!privateKey) {
		throw new Error("Private key not found");
	}

	const { url, id } = network;

	// Create client
	const client = createClient({ network });

	// Set up wallet with privatekey
	const pk: PrivateKeyType = PrivateKey.fromString(
		privateKey.toString(),
		false,
	);

	const walletPlugin = new WalletPluginPrivateKey(pk);

	// Set up session with wallet and chain
	const session = new Session({
		actor,
		permission,
		walletPlugin,
		chain: { id, url },
		permissionLevel: PermissionLevel.from(`${actor}@${permission}`),
	});

	// Connect session to client
	await client.setSession(session);

	return client;
};
