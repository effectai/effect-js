import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, eos } from "../src/exports";
import { createClient } from "./../src/client";
import type { Client } from "./../src/client";

declare module "bun" {
	interface Env {
		PERMISSION: string;
		NETWORK_NAME: string;
		ACTOR: string;
		PRIVATE_KEY: string;
		PUBLIC_KEY: string;
	}
}

export const destructureEnv = () => ({
	network: Bun.env.NETWORK_NAME === "mainnet" ? eos : jungle4,
	networkName: Bun.env.NETWORK,
	permission: Bun.env.PERMISSION,
	actor: Bun.env.ACTOR,
	privateKey: Bun.env.PRIVATE_KEY,
	publicKey: Bun.env.PUBLIC_KEY,
});

export const testClientSession = async (): Promise<Client> => {
	const { network, permission, actor, privateKey } = destructureEnv();
	const client = createClient({ network });

	// Set up wallet with privatekey
	const walletPlugin = new WalletPluginPrivateKey(privateKey);

	// Set up session with wallet and chain
	const session = new Session({
		actor,
		permission,
		walletPlugin,
		chain: {
			id: network.eosChainId,
			url: network.eosRpcUrl,
		},
	});

	// Connect session to client
	await client.setSession(session);

	return client;
};
