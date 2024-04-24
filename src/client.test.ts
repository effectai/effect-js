import { expect, test, describe, beforeAll } from "bun:test";
import { testClientSession, destructureEnv } from "./testHelper";
import { createClient, Client as ClientConstructor } from "./client";
import type { Client } from "./client";
import { Name } from "@wharfkit/antelope";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { Session } from "@wharfkit/session";
import { EffectSession } from "./session";

describe("Client", async () => {
	const { network, actor, permission, privateKey } = destructureEnv();

	test("createClient", () => {
		const client = createClient({ network });
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("Connect Client to Session", async () => {
		const client = createClient({ network });

		expect(client.session).toBeNull();

		// Create wallet with privatekey
		const walletPlugin = new WalletPluginPrivateKey(privateKey);

		// Set up session with wallet
		const session = new Session({
			actor,
			permission,
			walletPlugin,
			chain: {
				id: network.eosChainId,
				url: network.eosRpcUrl,
			},
		});

		// connect session to client
		await client.setSession(session);

		expect(client.session).toBeDefined();
		expect(client.session).toBeInstanceOf(EffectSession);
		expect(client.session?.vAccount?.address[1]).toEqual(actor);
	});
});

describe("Client testHelper", async () => {
	test("testClient defined", async () => {
		const client = await testClientSession();
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("testClient session connected", async () => {
		const client = await testClientSession();
		expect(client.session).toBeDefined();
		expect(client.session?.vAccount).toBeDefined();
		expect(client.session?.actor).toBeInstanceOf(Name);
	});
});
