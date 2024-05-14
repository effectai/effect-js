import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	Session,
	jungle4 as chain,
	createClient,
} from "@effectai/sdk";

const session = new Session({
	actor: "your-account",
	permission: "permission-level",
	chain,
	walletPlugin: new WalletPluginPrivateKey("your-private-key"),
});

const client = await createClient({ session });
// ---cut---
import { createCampaign, type CreateCampaignArgs } from "@effectai/sdk";

const myNewCampaign: CreateCampaignArgs["campaign"] = {
	version: 1.0,
	maxTaskTime: 100,
	reward: 3.5,
	title: "My First Campaign!",
	description: "Description of the task here.",
	instructions: "Some instructions here",
	template: "<h1>Template here</h1>",
	input_schema: null,
	output_schema: null,
	image: "",
	category: "",
	example_task: "",
	estimated_time: 10,
};

const campaign = await createCampaign({ client, campaign: myNewCampaign });