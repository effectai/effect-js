import type { UInt32 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import type { GetTableRowsResponse } from "../../exports";
import type { IAssetRow } from "atomicassets/build/API/Rpc/RpcCache";

export type getAccountAssetsArgs = {
	client: Client;
	account: string;
};

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
