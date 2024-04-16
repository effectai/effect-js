import type { ICollectionRow } from "atomicassets/build/API/Rpc/RpcCache";
import type { Client } from "../../client";
import type { UInt32 } from "@wharfkit/antelope";
import type { GetTableRowsResponse } from "../../exports";

export type getCollectionArgs = {
	client: Client;
	collectionName: string;
};

export const getCollection = async ({
	client,
	collectionName,
}: getCollectionArgs) => {
	const { atomic } = client.network.config;
	const { provider } = client;

	const { rows } = (await provider.v1.chain.get_table_rows({
		code: atomic.atomicContract,
		scope: collectionName,
		table: "collections",
		limit: 100,
	})) as GetTableRowsResponse<UInt32, ICollectionRow>;

	return rows;
};
