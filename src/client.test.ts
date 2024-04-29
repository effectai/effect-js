import { expect, test, describe, beforeAll } from "bun:test";
import { jungle4, eos } from "../src/exports";
import { testClientSession, destructureEnv } from "./testHelper";
import { createClient, Client as ClientConstructor } from "./client";
import { Name } from "@wharfkit/antelope";
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { Session } from "@wharfkit/session";
import { EffectSession } from "./session";

describe("Client", async () => {
	test("createClient TestNet", () => {
		const client = createClient({ network: jungle4 });
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("createClient Mainnet", () => {
		const client = createClient({ network: eos });
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("Connect Client to Session Mainnet", async () => {
		const { network, permission, actor, privateKey } = destructureEnv(eos);
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

	test("Connect Client to Session Testnet", async () => {
		const { network, permission, actor, privateKey } = destructureEnv(jungle4);
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

describe("Client testHelper Mainnet", async () => {
	const testEnvNetwork = eos;

	test("testClient defined Mainnet", async () => {
		const client = await testClientSession({ testEnvNetwork });
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("testClient session connected Mainnet", async () => {
		const client = await testClientSession({ testEnvNetwork });
		expect(client.session).toBeDefined();
		expect(client.session?.vAccount).toBeDefined();
		expect(client.session?.actor).toBeInstanceOf(Name);
	});
});

describe("Client testHelper Testnet", async () => {
	const testEnvNetwork = jungle4;
	test("testClient defined testnet", async () => {
		const client = await testClientSession({ testEnvNetwork });
		expect(client).toBeDefined();
		expect(client).toBeInstanceOf(ClientConstructor);
	});

	test("testClient session connected Testnet", async () => {
		const client = await testClientSession({ testEnvNetwork });
		expect(client.session).toBeDefined();
		expect(client.session?.vAccount).toBeDefined();
		expect(client.session?.actor).toBeInstanceOf(Name);
	});
});
