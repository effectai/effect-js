import { describe, test, expect } from "bun:test";
import { createClient } from "../../../client";
import { getAllCampaigns } from "./getAllCampaigns";
import { campaign } from "../../../../test/src/constants";
import { jungle4 } from "../../../exports";

describe("getAllCampaigns", async () => {
	test("getAllCampaigns() should retrieve all campaign", async () => {
		const client = await createClient({ network: jungle4 });
		const campaigns = await getAllCampaigns({ client });
		expect(campaigns).toBeDefined();
		expect(campaigns).toBeArray();
		expect(campaigns[0]).toContainKeys(Object.keys(campaign));
	});
});
