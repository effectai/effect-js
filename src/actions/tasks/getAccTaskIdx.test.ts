import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../test/src/utils";
import { getAccTaskIdx, getVAccounts } from "../../exports";

describe("getAccountTaskIndex", async () => {
	test("Should return an array", async () => {
		const client = await testClientSession();
		const { actor } = destructureEnv();
		const [vacc] = await getVAccounts({ client, actor });

		const accTaskIdx = await getAccTaskIdx({ client, accountId: vacc.id });
		expect(accTaskIdx).toBeDefined();
		expect(accTaskIdx).toBeArray();
	});

	test.todo(
		"Should return a value within the array when reserving task",
		async () => {
			// TODO: Implement this test
			// Figure out flow of reserving a task,
			// retrieving the task index,
			// verifying the task index and
			// submitting the task to complete the cycle.
		},
	);
});
