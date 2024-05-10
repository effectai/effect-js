import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import { getSubmissions } from "../../exports";

describe("getSubmissions", async () => {
	const submissionExample = {
		id: 37,
		campaign_id: 6,
		task_idx: 0,
		account_id: 12,
		content: null,
		batch_id: "25769803776",
		data: {
			first: 1,
			second:
				"426624b24a7703d02c5797020c46dc10d573171c77b6eca915311ecb1820700c126f",
		},
		paid: 0,
		submitted_on: "2024-05-04T20:39:30",
	};

	test("Should get submissions", async () => {
		const client = await testClientSession();
		const submissions = await getSubmissions({ client, reverse: false });

		expect(submissions).toBeDefined();
		expect(submissions).toBeArray();

		const [submission] = submissions;
		expect(Object.keys(submission)).toEqual(Object.keys(submissionExample));
	});
});
