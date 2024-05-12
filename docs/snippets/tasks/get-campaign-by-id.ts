import {
	type Campaign,
	type CampaignWithInfo,
	createClient,
	getCampaignById,
	jungle4 as network,
} from "@effectai/sdk";

const client = await createClient({ network });
const campaign = await getCampaignById({ client, id: 1 });
