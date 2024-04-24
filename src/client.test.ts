import { expect, test, describe, beforeAll } from "bun:test";
import { testClient } from "./helpers";
import type { Client } from "../src/client";
import { getVAccounts, getAccountById } from "../src/exports";
import { Name } from "@wharfkit/antelope";

describe("Client SDK", () => {
	let client: Client;
	beforeAll(async () => {
		client = await testClient();
	});

	test("Client defined", () => {
		expect(client).toBeDefined();
	});

	test("Client session connected", async () => {
		expect(client.session).toBeDefined();
		expect(client.session?.vAccount).toBeDefined();
		expect(client.session?.actor.toString()).toEqual("forcedev1234");
	});
});
