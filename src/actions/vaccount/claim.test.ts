import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import { claim } from "../../exports";

describe("Claim", async () => {
	test.todo("Should throw when no payment is pending", async () => {
		const client = await testClientSession();
		const response = await claim({ client });
		// expect(async () => await claim({ client })).toThrow();
		expect(response).toBeDefined();
	});

	test.todo("Should claim pending payments", async () => {
		// TODO: Should claim pending payments
		// Figure out flow to test this
	});
});
