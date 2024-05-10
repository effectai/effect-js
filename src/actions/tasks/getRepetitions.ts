import type { Client } from "../../client";
import { useEFXContracts } from "../../utils/state";

export type GetRepetitionsArgs = {
	client: Client;
};

export const getRepetitions = async ({ client }: GetRepetitionsArgs) => {
	try {
		const { tasks } = useEFXContracts(client);
		const { provider } = client;

		const response = await provider.v1.chain.get_table_rows({
			code: tasks,
			table: "repsdone",
			scope: tasks,
		});

		return response.rows;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
