import { expect, test, describe, beforeAll } from "bun:test";
import { testClientSession } from "../../testHelper";
import type { Client } from "../../client";
import { getVAccounts, getAccountById } from "./getAccounts";
import { Name } from "@wharfkit/antelope";

describe("Client SDK", () => {
	let client: Client;
	beforeAll(async () => {
		client = await testClientSession();
	});

	test("getVAccounts", async () => {
		const actor = Name.from("forcedev1234");
		const [vacc] = await getVAccounts({ client, actor });
		expect(vacc.address[1]).toEqual("forcedev1234");
		expect(vacc.id).toBeNumber();
	});
});
