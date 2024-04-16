import { UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import type { Campaign } from "../../../types/campaign";
import type { GetTableRowsResponse } from "../../../types/helpers";
import { getIpfsResource } from "../../ipfs/getIpfsResource";

export const getCampaigns = async ({
	client,
	page = 1,
	limit = 20,
	reverse = false,
	ipfsFetch = true,
}: {
	client: Client;
	ipfsFetch?: boolean;
	page?: number;
	limit?: number;
	reverse?: boolean;
}): Promise<GetTableRowsResponse<UInt128, Campaign>> => {
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
			campaign.info = await getIpfsResource(client, campaign.content.field_1);
		}
		rows.push(campaign);
	}

	return {
		rows,
		next_key: response.next_key,
		more: response.more,
	};
};

export const getCampaign = async (
	client: Client,
	id: number,
): Promise<Campaign> => {
	const { contracts } = client.network.config.efx;

	try {
		const response = await client.provider.v1.chain.get_table_rows({
			table: "campaign",
			code: contracts.tasks,
			scope: contracts.tasks,
			lower_bound: UInt128.from(id),
			upper_bound: UInt128.from(id),
			limit: 1,
		});

		const [campaign] = response.rows;
		campaign.info = await getIpfsResource(client, campaign.content.field_1);
		return campaign;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
