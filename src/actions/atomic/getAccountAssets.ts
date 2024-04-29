import type { Name, UInt32 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import type { GetTableRowsResponse } from "../../exports";

export type getAccountAssetsArgs = {
	client: Client;
	account: Name;
};

// TODO: What does this comment mean?
// Override this interface, atomicassets exports a broken type.
export interface IAssetRow {
	asset_id: string;
	collection_name: string;
	schema_name: string;
	template_id: number;
	ram_payer: string;
	backed_tokens: string[];
	immutable_serialized_data: number[];
	mutable_serialized_data: number[];
}

// TODO:: Implement Pagination
export const getAccountAssets = async ({
	client,
	account,
}: getAccountAssetsArgs) => {
	const { atomic } = client.network.config;
	const { provider } = client;

	const { rows } = (await provider.v1.chain.get_table_rows({
		code: atomic.atomicContract,
		scope: account,
		table: "assets",
		limit: 100,
	})) as GetTableRowsResponse<UInt32, IAssetRow>;

	return rows;
};
