import { describe, test, expect } from "bun:test";
import { createClient } from "../../../client";
import { getCampaignById } from "./getCampaignById";
import { jungle4 } from "../../../exports";
import { campaign as exampleCampaign } from "../../../../test/src/constants";

describe("getCampaignById", async () => {
	test("getCampaignById() should throw an error when accessing unretrievable id", async () => {
		const client = createClient({ network: jungle4 });
		const id = 11111;
		expect(async () => {
			await getCampaignById({ client, id });
		}).toThrowError();
	});

	test("getCampaignById() should retrieve campaign on testnet", async () => {
		const client = createClient({ network: jungle4 });
		const id = 1;
		const campaign = await getCampaignById({ client, id });
		expect(campaign).toBeDefined();
		expect(campaign).toBeObject();
		expect(campaign).toContainKeys(Object.keys(exampleCampaign));
	});
});
