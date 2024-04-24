import { expect, test, describe, beforeAll } from "bun:test";
import { testClient } from "./testHelper";
import type { Client } from "../src/client";

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
