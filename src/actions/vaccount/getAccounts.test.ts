import { expect, test, describe, beforeAll } from "bun:test";
import type { VAccount } from "../../types/user";
import { testClientSession } from "../../testHelper";
import type { Client } from "../../client";
import { getVAccounts, getAccountById } from "./getAccounts";
import { Name } from "@wharfkit/antelope";
import { jungle4 } from "../../exports";

describe("Get Virtual Accounts", () => {
	const vaccExample: VAccount = {
		id: 0,
		nonce: 53,
		address: ["name", "efxforceacc1"],
		balance: {
			quantity: "3525.0000 EFX",
			contract: "effecttokens",
		},
	};

	let client: Client;
	beforeAll(async () => {
		client = await testClientSession({ testEnvNetwork: jungle4 });
	});

	test("getVAccounts() on testnet", async () => {
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

	test("getAccountByID() should throw Error", async () => {
		const accountId = 9999999; // Should be imposible to find
		expect(async () => {
			await getAccountById({ client, accountId });
		}).toThrowError();
	});
});
