import { describe, test, expect } from "bun:test";
import { deposit } from "./deposit";
import { testClientSession, destructureEnv } from "../../../test/src/utils";
import { getVAccounts } from "./getAccounts";

describe("deposit", async () => {
	test.todo(
		"Should throw an error when Session is not set on Client.",
		() => {},
	);

	test.skip("Check that deposit is functioning correctly", async () => {
		const { actor } = destructureEnv();
		const client = await testClientSession();
		const [vAccount] = await getVAccounts({ client, actor });
		const vAccountId = vAccount.id;
		const result = await deposit({ client, vAccountId, amount: 0.1 });
		expect(result).toBeDefined();
	});
});
