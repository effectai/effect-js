import { expect, test, describe, beforeAll } from "bun:test";
import { jungle4, eos } from "../src/exports";
import { createClient, Client as ClientConstructor } from "./client";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { destructureEnv } from "../test/src/utils";
import { Session } from "@wharfkit/session";

describe("Client", async () => {
	test("Create client with Session", async () => {
		const { network, permission, actor, privateKey } = destructureEnv();

    // Create wallet with privatekey
    const walletPlugin = new WalletPluginPrivateKey(privateKey);

    // Set up session with wallet
    const session = new Session({ actor, permission, walletPlugin, chain });

		const client = createClient({ session });
		expect(client.session).toBeDefined();
		expect(client.network.id).toBe(network.id);
	});

	test("Create client with Network", async () => {
		const { network } = destructureEnv();
		const client = createClient({ network });
		expect(client.session).toBeDefined();
	});
});
