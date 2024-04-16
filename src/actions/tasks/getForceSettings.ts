import type { Client } from "../../client";
import type { GetTableRowsResponse } from "../../types/helpers";

//TODO:: Define the ForceSettings type
export type ForceSettings = {
	payout_delay_sec: number;
	force_vaccount_id: number;
};

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
		})) as GetTableRowsResponse<unknown, ForceSettings>;

		const [config] = response.rows;
		return config;
	} catch (error) {
		console.error(error);
		throw new Error("Error retrieving Force settings");
	}
};
