import { describe, test, expect } from "bun:test";
import { testClientSession } from "../../../../test/src/utils";
import { getCampaigns } from "./getCampaigns";
import { jungle4 } from "../../../exports";

describe("getCampaigns", async () => {
  test("getCampaigns() should return 3 campaigns", async () => {
    const client = await testClientSession({ network: jungle4 });
    const campaigns = await getCampaigns({ client, limit: 3 });
    expect(campaigns).toBeDefined();
    expect(campaigns.rows).toBeArray();
    expect(campaigns.rows.length).toBe(3);
  });
});
