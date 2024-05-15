import { CampaignWithInfo } from "../../src/exports";

export const campaign: CampaignWithInfo = {
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
