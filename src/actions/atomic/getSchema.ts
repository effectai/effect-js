import type { Client } from "../../client";
import { AtomicAssetSchema } from "../../types/campaign";

export const getSchema = async (
  client: Client,
  collectionName: string,
  schemaName: string,
): Promise<AtomicAssetSchema> => {
  const { atomic } = client.network.config;
  const { provider } = client;

  const { rows } = await provider.v1.chain.get_table_rows({
    code: atomic.atomicContract,
    scope: collectionName,
    table: "schemas",
    limit: 100,
  });

  const schema = rows.find(
    (schema: AtomicAssetSchema) => schema.schema_name === schemaName,
  );
  return schema;
};
