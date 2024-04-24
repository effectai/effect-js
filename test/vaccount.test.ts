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

	test("getVAccounts", async () => {
		const actor = Name.from("forcedev1234");
		const [vacc] = await getVAccounts({ client, actor });
		expect(vacc.address[1]).toEqual("forcedev1234");
		expect(vacc.id).toBeNumber();
	});
});
