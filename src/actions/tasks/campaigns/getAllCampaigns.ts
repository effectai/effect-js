import type { Client } from "../../../client";
import { getCampaigns } from "./getCampaigns";

export type GetAllCampaignsArgs = {
	client: Client;
};

export const getAllCampaigns = async ({ client }: GetAllCampaignsArgs) => {
	const campaigns = [];
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const { rows, more } = await getCampaigns({ client, page });
		campaigns.push(...rows);
		hasMore = more;
		page++;
	}

	return campaigns;
};
