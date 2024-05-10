import { describe, test, expect } from "bun:test";
import { testClientSession } from "../../../../test/src/utils";
import { getCampaigns } from "./getCampaigns";

describe("getCampaigns", async () => {
	test("getCampaigns() should return 3 campaigns", async () => {
		const client = await testClientSession();
		const campaigns = await getCampaigns({ client, limit: 3 });
		expect(campaigns).toBeDefined();
		expect(campaigns.rows).toBeArray();
		expect(campaigns.rows.length).toBe(3);
	});
});
