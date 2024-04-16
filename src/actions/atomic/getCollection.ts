import type { Client } from "../../client";

export const getCollection = async (client: Client, collectionName: string) => {
	const { atomic } = client.network.config;
	const { provider } = client;

	const { rows } = await provider.v1.chain.get_table_rows({
		code: atomic.atomicContract,
		scope: collectionName,
		table: "collections",
		limit: 100,
	});

	return rows;
};
