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
		const client = await createClient({ network: jungle4 });
		expect(async () => {
			await createCampaign({
				client,
				campaign: myNewCampaign,
			});
		}).toThrowError();
	});

	test.skip("createCampaign() should create a new campaign", async () => {
		const client = await testClientSession();
		const result = await createCampaign({ client, campaign: myNewCampaign });
		expect(result).toBeDefined();
	});
});
