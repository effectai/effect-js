import { describe, test, expect } from "bun:test";
import { getCampaignById } from "./getCampaignById";
import { createClient } from "../../../client";
import { testClientSession } from "../../../testHelper";
import { jungle4, type CampaignWithInfo } from "../../../exports";

describe("getCamapignById", async () => {
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
		expect(campaign).toContainKeys(Object.keys(campaignExample));
	});
});

const campaignExample: CampaignWithInfo = {
	id: 1,
	reservations_done: 1,
	total_submissions: 2,
	total_tasks: 1,
	active_batch: 1,
	num_batches: 1,
	owner: ["name", "efxefxefxefx"],
	paused: false,
	content: {
		field_0: 0,
		field_1: "QmVKwq3bYM6cPW6kstpiq4WYckWRtdfJnzAmms2iMyGqQg",
	},
	max_task_time: 3600,
	reward: {
		quantity: "0.0100 EFX",
		contract: "efxtoken1112",
	},
	qualis: [],
	info: {
		version: 1.1,
		title: "Labelstudio OCR (LAION)",
		description:
			"You are contributing to a dataset for conversational style chatbots.",
		instructions: "Some instrucitons here",
		template: "Template here",
		input_schema: null,
		output_schema: null,
		image: "",
		category: "",
		example_task: "",
		estimated_time: 10,
	},
};
