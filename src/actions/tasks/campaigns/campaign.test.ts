import { describe, test, expect } from "bun:test";
import { getCampaignById } from "./getCampaignById";
import { getAllCampaigns } from "./getAllCampaigns";
import { createCampaign } from "./createCampaign";
import { getCampaigns, type CampaignWithInfo } from "./getCampaigns";
import { createClient } from "../../../client";
import { testClientSession } from "../../../testHelper";
import { jungle4 } from "../../../exports";
import type { Mkcampaign } from "../../../@generated/types/effecttasks2";

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

describe("getAllCampaigns", async () => {
	test("getAllCampaigns() should retrieve all campaign", async () => {
		const client = createClient({ network: jungle4 });
		const campaigns = await getAllCampaigns({ client });
		console.debug(campaigns);
		expect(campaigns).toBeDefined();
		expect(campaigns).toBeArray();
		expect(campaigns[0]).toContainKeys(Object.keys(campaignExample));
	});
});

describe("getCampaigns", async () => {
	test("getCampaigns() should return 3 campaigns", async () => {
		const client = await testClientSession({ testEnvNetwork: jungle4 });
		const campaigns = await getCampaigns({ client, limit: 3 });
		expect(campaigns).toBeDefined();
		expect(campaigns.rows).toBeArray();
		expect(campaigns.rows.length).toBe(3);
	});
});

describe("createCampaign", async () => {
	const campaign: Mkcampaign = {
		owner: ["name", "efxefxefxefx"],
		content: {
			field_0: 0,
			field_1: "QmVKwq3bYM6cPW6kstpiq4WYckWRtdfJnzAmms2iMyGqQg",
		},
		max_task_time: 100,
		reward: { quantity: "42.1234, EFX", contract: "efxtoken1112" },
		qualis: [],
		payer: "efxefxefxefx",
	};

	const data = {
		version: 1.1,
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

	test("createCampaign() should throw an error", async () => {
		const client = createClient({ network: jungle4 });
		expect(async () => {
			await createCampaign({ client, campaign, data });
		}).toThrowError();
	});

	test.skip("createCampaign() should create a new campaign", async () => {
		const client = await testClientSession({ testEnvNetwork: jungle4 });
		const result = await createCampaign({ client, campaign, data });
		console.debug(result);
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
		instructions: "Some instructions here",
		template: "Template here",
		input_schema: null,
		output_schema: null,
		image: "",
		category: "",
		example_task: "",
		estimated_time: 10,
	},
};
