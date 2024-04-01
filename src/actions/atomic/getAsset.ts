import { UInt128 } from "@wharfkit/antelope";
import { Client } from "../../client";
import { AtomicAsset } from "../../types/campaign";
import { getSchema } from "./getSchema";
import { deserializeAsset } from "../../utils";

export const getAsset = async (
  client: Client,
  account: string,
  assetId: string,
  doDeserializeAsset: boolean = true,
) => {
  try {
    const { provider } = client;
    const { atomicContract } = client.network.config.atomic;

    const { rows }: { rows: AtomicAsset[] } =
      await provider.v1.chain.get_table_rows({
        code: atomicContract,
        scope: account,
        table: "assets",
        limit: 1,
        lower_bound: UInt128.from(assetId),
        upper_bound: UInt128.from(assetId),
      });

    const [asset] = rows;

    if (doDeserializeAsset) {
      const schema = await getSchema(
        client,
        asset.collection_name,
        asset.schema_name,
      );
      return deserializeAsset(asset, schema);
    } else {
      return asset;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
