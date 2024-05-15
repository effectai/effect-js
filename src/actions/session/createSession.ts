import { Session } from "@wharfkit/session";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import type { Client } from "../../client";
import { setSession } from "./setSession";

export type CreateSessionArgs = {
	client: Client;
	actor: string;
	permission: string;
	privateKey: string;
};

export const createSession = async ({
	client,
	actor,
	permission,
	privateKey,
}: CreateSessionArgs) => {
	const walletPlugin = new WalletPluginPrivateKey(privateKey);
	const { id, url } = client.network;

	const session = new Session({
		actor,
		permission,
		walletPlugin,
		chain: { id, url },
	});

	await setSession({ client, session });
};
