import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { Session, jungle4 as chain, createClient } from "@effectai/sdk";

const session = new Session({
	actor: "your-account",
	permission: "permission-level",
	chain,
	walletPlugin: new WalletPluginPrivateKey("your-private-key"),
});

const client = await createClient({ session });
// ---cut---
import { createCampaign } from "@effectai/sdk";

const campaign = await createCampaign({
	client,
	campaign: {
		// Name of your campaign
		title: "My First Campaign!",
		// Description of the campaign
		description: "Description of the task here.",
		// Campaign version
		version: 1.0,
		// Maximum time to complete a task in seconds
		maxTaskTime: 100,
		// EFX reward per task
		reward: 3.5,
		// Custom instructions for completing tasks in this campaign (Markdown supported)
		instructions: "Some instructions here",
		// Template of the campaign see https://docs.effect.ai/docs/templates/introduction
		template: "<h1>Template here</h1>",
		// Input schema to validate the task data.
		input_schema: null,
		// TODO::
		output_schema: null,
		// Image URL for the campaign
		image: "",
		// Category of the campaign
		category: "",
		// TODO::
		example_task: "",
		// TODO:: Estimated time to complete a task in this campaign
		estimated_time: 10,
	},
});
