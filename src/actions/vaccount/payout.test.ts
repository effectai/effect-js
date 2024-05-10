import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../test/src/utils";
import { payout } from "../../exports";

describe("PayOut", async () => {
	test("Should fail payout when there is no pending payout", async () => {
		const { actor } = destructureEnv();
		const client = await testClientSession();
		expect(async () => await payout({ client, actor })).toThrowError(
			"No payouts currently claimable.",
		);
	});

	test.todo("Should payout pending payments", async () => {
		// TODO: Should payout pending payments
		// Figure out flow to test this
	});
});
