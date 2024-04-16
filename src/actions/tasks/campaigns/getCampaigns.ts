import { UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import type { Campaign, CampaignInfo } from "../../../types/campaign";
import type { GetTableRowsResponse } from "../../../types/helpers";
import { getIpfsResource } from "../../ipfs/getIpfsResource";

export type GetCampaignsArgs = {
	client: Client;
	page?: number;
	limit?: number;
	reverse?: boolean;
	ipfsFetch?: boolean;
};

export const getCampaigns = async ({
	client,
	page = 1,
	limit = 20,
	reverse = false,
	ipfsFetch = true,
}: GetCampaignsArgs): Promise<GetTableRowsResponse<UInt128, Campaign>> => {
	const { contracts } = client.network.config.efx;
	const provider = client.provider;

	const rows: Campaign[] = [];
	const lowerBound: UInt128 = UInt128.from((page - 1) * limit);

	const response = await provider.v1.chain.get_table_rows({
		key_type: "i128",
		code: contracts.tasks,
		table: "campaign",
		scope: contracts.tasks,
		lower_bound: lowerBound,
		limit,
		reverse,
	});

	for (const row of response.rows) {
		const campaign: Campaign = row;
		if (ipfsFetch) {
			campaign.info = (await getIpfsResource({
				client,
				hash: campaign.content.field_1,
			})) as CampaignInfo;
		}
		rows.push(campaign);
	}

	return {
		rows,
		next_key: response.next_key,
		more: response.more,
	};
};
