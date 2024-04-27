import { expect, test, describe, mock } from "bun:test";
import { destructureEnv, testClientSession } from "../../testHelper";
import { createClient } from "../../client";
import { createVAccount } from "./createAccount";
import { Name } from "@wharfkit/antelope";

describe("Create Virtual account", () => {
	test.skip("createVAccount() should return a TransactResult", async () => {
		const client = await testClientSession();
		const account = Name.from("efxforce1112");
		const result = await createVAccount({ client, account });
		expect(result).toBeDefined();
	});

	test("createVAccount() should throw Error when no Session is found", async () => {
		expect(async () => {
			const { network } = destructureEnv();
			const client = createClient({ network });
			const account = Name.from("efxforce1112");
			await createVAccount({ client, account });
		}).toThrowError();
	});
});
