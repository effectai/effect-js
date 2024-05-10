import { expect, test, describe } from "bun:test";
import { createClient } from "../../client";
import { testClientSession } from "../../../test/src/utils";
import { claim, jungle4 as network } from "../../exports";

describe("Claim", async () => {
	test.todo("Should throw when no payment is pending", async () => {
		// const client = await createClient({ network });
		const client = await testClientSession();
		const response = await claim({ client });
		console.error(response);
		// expect(async () => await claim({ client })).toThrow();
	});

	test.todo("Should claim pending payments", async () => {
		// TODO: Should claim pending payments
		// Figure out flow to test this
	});
});
