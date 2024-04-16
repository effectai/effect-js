import { UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { useEFXContracts } from "../../../utils/state";

export const getBatch = async (client: Client, batchId: number) => {
	const { provider } = client;
	const { tasks } = useEFXContracts(client);

	const response = await provider.v1.chain.get_table_rows({
		code: tasks,
		table: "batch",
		scope: tasks,
		lower_bound: UInt128.from(batchId),
		upper_bound: UInt128.from(batchId),
		limit: 1,
	});

	const [batch] = response.rows;
	return batch;
};
