import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../../test/src/utils";
import { reserveTask } from "./reserveTask";

describe("reserveTask", async () => {
	// TODO: Figure out flow for how to test this function
	test.todo("Should reserve task", async () => {
		const client = await testClientSession();

		const reservation = await reserveTask({ client, campaignId: 1 });

		expect(reservation).toBeDefined();
	});
});
