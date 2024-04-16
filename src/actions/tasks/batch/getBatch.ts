import { UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { useEFXContracts } from "../../../utils/state";

export type GetBatchByIdArgs = {
	client: Client;
	id: number;
};

export const getBatchById = async ({ client, id }: GetBatchByIdArgs) => {
	const { provider } = client;
	const { tasks } = useEFXContracts(client);

	const response = await provider.v1.chain.get_table_rows({
		code: tasks,
		table: "batch",
		scope: tasks,
		lower_bound: UInt128.from(id),
		upper_bound: UInt128.from(id),
		limit: 1,
	});

	const [batch] = response.rows;
	return batch;
};
