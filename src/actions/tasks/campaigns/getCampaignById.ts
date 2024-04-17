import type { Campaign } from "../../../@generated/types/effecttasks2";
import { getIpfsResource, type Client } from "../../../exports";
import { UInt128, type UInt32Type } from "@wharfkit/antelope";

export type getCampaignByIdArgs = {
	client: Client;
	id: UInt32Type;
};

export const getCampaignById = async ({
	client,
	id,
}: getCampaignByIdArgs): Promise<Campaign> => {
	const { contracts } = client.network.config.efx;

	const response = await client.provider.v1.chain.get_table_rows({
		table: "campaign",
		code: contracts.tasks,
		scope: contracts.tasks,
		lower_bound: UInt128.from(id),
		upper_bound: UInt128.from(id),
		limit: 1,
	});

	const [campaign] = response.rows;

	campaign.info = await getIpfsResource({
		client,
		hash: campaign.content.field_1,
	});

	return campaign;
};
