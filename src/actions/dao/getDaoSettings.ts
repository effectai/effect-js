import type { Client } from "../../client";
import { useEFXContracts } from "../../utils/state";

/**
 * Retrieve the DAO config
 * @returns {Promise<DaoConfig>} Returns the DAO config
 */

export const getDaoSettings = async (client: Client) => {
	const { dao } = useEFXContracts(client);
	const { provider } = client;

	const { rows } = await provider.v1.chain.get_table_rows({
		code: dao,
		scope: dao,
		table: "config",
		limit: 1,
	});

	const [config] = rows;
	return config;
};
