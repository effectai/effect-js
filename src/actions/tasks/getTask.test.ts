import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../test/src/utils";
import {
	getAccTaskIdx,
	getBatchById,
	getCampaignById,
	getTaskData,
} from "../../exports";

describe("getTask", async () => {
	test("Should get task", async () => {
		const client = await testClientSession();
		const campaignById = await getCampaignById({ client, id: 1 });
		const batchById = await getBatchById({
			client,
			id: campaignById.active_batch,
		});
		const taskIndex = batchById.start_task_idx;

		const taskData = await getTaskData({
			client,
			taskIndex,
			batchId: batchById.id,
		});
		expect(taskData).toBeDefined();
	});
});
