import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { jungle4, eos } from "../src/exports";
import { createClient } from "./../src/client";
import type { Client } from "./../src/client";

declare module "bun" {
	interface Env {
		PERMISSION: string;
		NETWORK: string;
		ACCOUNTNAME: string;
		PRIVATE_KEY: string;
		PUBLIC_KEY: string;
	}
}

export const testClient = async (): Promise<Client> => {
	const client = createClient({
		network: Bun.env.NETWORK === "mainnet" ? eos : jungle4,
	});

	// Test Key
	const walletPlugin = new WalletPluginPrivateKey(Bun.env.PRIVATE_KEY);

	// Determine network specifig config
	const { eosRpcUrl, eosChainId } =
		Bun.env.NETWORK === "mainnet" ? eos : jungle4;

	// Create Session
	const session = new Session({
		actor: Bun.env.ACCOUNTNAME,
		permission: Bun.env.PERMISSION,
		chain: {
			id: eosChainId,
			url: eosRpcUrl,
		},
		walletPlugin,
	});

	// Connect session to client
	await client.setSession(session);

	return client;
};
