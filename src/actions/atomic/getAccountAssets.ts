import type { Client } from "../../client";

export const getAccountAssets = async (client: Client, account: string) => {
	const { atomic } = client.network.config;
	const { provider } = client;

	const { rows } = await provider.v1.chain.get_table_rows({
		code: atomic.atomicContract,
		scope: account,
		table: "assets",
		limit: 100,
	});

	return rows;
};
