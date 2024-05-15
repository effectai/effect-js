import { expect, test, describe } from "bun:test";
import { testClientSession } from "../../../../test/src/utils";
import { getBatchById, getCampaignById } from "../../../exports";

describe("getAvatar", async () => {
	test("Should create a new batch for given campaign", async () => {
		const campaignId = 1;
		const client = await testClientSession();
		const campaign = await getCampaignById({ client, id: campaignId });
		const batchById = await getBatchById({
			client,
			id: campaign.active_batch,
		});

		const batch = await getBatchById({ client, id: batchById.id });
		expect(batch).toBeDefined();
		expect(batch.id).toBe(batchById.id);
	});

	test("Should return undefined if batch does not exist.", async () => {
		const nonExistentBatchId = 999999999;
		const client = await testClientSession();
		const batch = await getBatchById({ client, id: nonExistentBatchId });
		expect(batch).toBeUndefined();
	});
});
