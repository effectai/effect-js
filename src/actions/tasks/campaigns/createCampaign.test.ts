import { describe, test, expect } from "bun:test";
import { createClient } from "../../../client";
import { type CreateCampaignArgs, createCampaign } from "./createCampaign";
import { testClientSession } from "../../../../test/src/utils";
import { jungle4 } from "../../../exports";

const myNewCampaign: CreateCampaignArgs["campaign"] = {
  version: 1.0,
  maxTaskTime: 100,
  reward: 3.5,
  title: "Labelstudio OCR (LAION)",
  description:
    "You are contributing to a dataset for conversational style chatbots.",
  instructions: "Some instructions here",
  template: "<h1>Template here</h1>",
  input_schema: null,
  output_schema: null,
  image: "",
  category: "",
  example_task: "",
  estimated_time: 10,
};

describe("createCampaign", async () => {
  test("createCampaign() should throw an error", async () => {
    const client = createClient({ network: jungle4 });
    expect(async () => {
      await createCampaign({
        client,
        campaign: myNewCampaign,
      });
    }).toThrowError();
  });

  test.skip("createCampaign() should create a new campaign", async () => {
    const client = await testClientSession({ network: jungle4 });
    const result = await createCampaign({ client, campaign: myNewCampaign });
    expect(result).toBeDefined();
    /**
     * response: {
     *   transaction_id: "9d321af28b7354c5cbee6ee956ea3e6590228b48539a9f0cafc6a8ca5ffe0ca2",
     *   processed: {
     *     id: "9d321af28b7354c5cbee6ee956ea3e6590228b48539a9f0cafc6a8ca5ffe0ca2",
     *     block_num: 137520447,
     *     block_time: "2024-05-01T03:55:31.500",
     *     producer_block_id: null,
     *     receipt: [Object ...],
     *     elapsed: 4854,
     *     net_usage: 176,
     *     scheduled: false,
     *     action_traces: [
     *       [Object ...]
     *     ],
     *     account_ram_delta: null,
     *     except: null,
     *     error_code: null,
     *   },
     * }
     */
  });
});
