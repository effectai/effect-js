import type { ISchemaRow } from "atomicassets/build/API/Rpc/RpcCache";
import type { Client } from "../../client";

export type getSchemaArgs = {
	client: Client;
	collectionName: string;
	schemaName: string;
};

export const getSchema = async ({
	client,
	collectionName,
	schemaName,
}: getSchemaArgs): Promise<ISchemaRow> => {
	const { atomic } = client.network.config;
	const { provider } = client;

	const { rows } = await provider.v1.chain.get_table_rows({
		code: atomic.atomicContract,
		scope: collectionName,
		table: "schemas",
		limit: 100,
	});

	const schema = rows.find(
		(schema: ISchemaRow) => schema.schema_name === schemaName,
	);

	return schema;
};
