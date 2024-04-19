import type { Client } from "../../client";
import type { GetTableRowsResponse } from "../../types/helpers";
import type { Settings } from "../../@generated/types/effecttasks2";

export type GetForceSettingsArgs = {
	client: Client;
};

export const getForceSettings = async ({ client }: GetForceSettingsArgs) => {
	const { provider, network } = client;
	const { contracts } = network.config.efx;

	try {
		const response = (await provider.v1.chain.get_table_rows({
			code: contracts.tasks,
			scope: contracts.tasks,
			table: "settings",
		})) as GetTableRowsResponse<unknown, Settings>;

		const [config] = response.rows;
		return config;
	} catch (error) {
		console.error(error);
		throw new Error("Error retrieving Force settings");
	}
};
