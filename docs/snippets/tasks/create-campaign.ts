import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createCampaign,
	Session,
	jungle4 as chain,
	type CreateCampaignArgs,
	createClient,
} from "@effectai/sdk";

const myNewCampaign: CreateCampaignArgs["campaign"] = {
	version: 1.0,
	maxTaskTime: 100,
	reward: 3.5,
	title: "Labelstudio OCR (LAION)",
	description: "Description of the ttask here.",
	instructions: "Some instructions here",
	template: "<h1>Template here</h1>",
	input_schema: null,
	output_schema: null,
	image: "",
	category: "",
	example_task: "",
	estimated_time: 10,
};

const session = new Session({
	actor: "your-account",
	permission: "permission-level",
	chain,
	walletPlugin: new WalletPluginPrivateKey("your-private-key"),
});

const client = await createClient({ session });
const result = await createCampaign({ client, campaign: myNewCampaign });
console.log(result);
