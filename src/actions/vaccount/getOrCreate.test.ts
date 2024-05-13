import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../test/src/utils";
import type { Account } from "../../exports";
import { getOrCreateVAccount } from "./getOrCreate";

describe("GetOrCreate", async () => {
	const vaccExample: Account = {
		id: 0,
		nonce: 53,
		address: ["name", "efxforceacc1"],
		balance: {
			quantity: "3525.0000 EFX",
			contract: "effecttokens",
		},
	};

	test("Should get account", async () => {
		const client = await testClientSession();
		const { actor } = destructureEnv();
		const result = await getOrCreateVAccount({ client, actor });
		expect(result).toBeDefined();
		expect(result).toContainKeys(Object.keys(vaccExample));
	});

	test.todo("Should create new account", async () => {
		// TODO: Should create new account
		// Figure out flow to test this
	});
});
