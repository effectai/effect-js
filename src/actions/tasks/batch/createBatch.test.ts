import { expect, test, describe } from "bun:test";
import { destructureEnv, testClientSession } from "../../../../test/src/utils";
import {
	createBatch,
	getBatchById,
	getCampaignById,
	getIpfsResource,
	jungle4 as network,
} from "../../../exports";

describe("getAvatar", async () => {
	test.todo("Should create a new batch for given campaign", async () => {
		const campaignId = 1;
		const client = await testClientSession();
		const preCampaign = await getCampaignById({ client, id: campaignId });

		const batch = await getBatchById({ client, id: preCampaign.active_batch });
		console.debug("batch", batch);

		const batchData = await getIpfsResource({
			client,
			hash: batch.content.field_1,
		});
		console.debug("batchData", batchData);

		const taskData: Record<string, string> = {
			"e20bb19f-ca14-4575-8c14-1916896cb2f3": "Random question here",
			"35921e43-f058-4214-88e8-062a7eebe878": "Random answer here",
			"ba1865eb-6a52-4e06-9a64-ed351cf3f2e2": "Other question here",
			"b9d1a1f7-3b4f-4c7b-9b5d-3f0b3b7d4b9e": "Other answer here",
		};

		const response = await createBatch({
			client,
			campaignId,
			reward: 1,
			repetitions: 1,
			taskData,
		});

		expect(response).toBeDefined();

		const postCampaign = await getCampaignById({ client, id: campaignId });
		expect(postCampaign.num_batches).toBeGreaterThan(preCampaign.num_batches);
	});

	test.todo("Should fail when ...", async () => {
		// TODO: Should fail when there isn't enough funds, or session connected.
		// Figure out flow to test this
	});
});
