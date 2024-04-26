import { expect, test, describe, beforeAll } from "bun:test";
import type { VAccount } from "../../types/user";
import { testClientSession } from "../../testHelper";
import type { Client } from "../../client";
import { getVAccounts, getAccountById } from "./getAccounts";
import { Name } from "@wharfkit/antelope";

describe("Get Virtual Accounts", () => {
	const vaccExample: VAccount = {
		id: 0,
		nonce: 53,
		address: ["name", "efxforce1112"],
		balance: {
			quantity: "3525.0000 EFX",
			contract: "efxtoken1112",
		},
	};

	let client: Client;
	beforeAll(async () => {
		client = await testClientSession();
	});

	test.if(Bun.env.NETWORK_NAME === "mainnet")("getVAccounts()", async () => {
		const actor = Name.from("force.efx");
		const vaccs = await getVAccounts({ client, actor });

		expect(vaccs).toBeDefined();
		expect(vaccs).toBeArray();
		expect(vaccs[0]).toContainKeys(Object.keys(vaccExample));
	});

	test.if(Bun.env.NETWORK_NAME === "testnet")("getVAccounts()", async () => {
		const actor = Name.from("efxforce1112");
		const vaccs = await getVAccounts({ client, actor });

		expect(vaccs).toBeDefined();
		expect(vaccs).toBeArray();
		expect(vaccs[0]).toContainKeys(Object.keys(vaccExample));
	});

	test("getAccountById()", async () => {
		const vacc = await getAccountById({ client, accountId: 0 });
		expect(vacc).toBeDefined();
		expect(vacc).toContainKeys(Object.keys(vaccExample));
	});
});
