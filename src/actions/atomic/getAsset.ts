import { UInt128 } from "@wharfkit/antelope";
import { ObjectSchema, deserialize } from "atomicassets";
import type {
	IAssetRow,
	ISchemaRow,
} from "atomicassets/build/API/Rpc/RpcCache";
import type { Client } from "../../client";
import { getSchema } from "./getSchema";

export const deserializeAsset = (asset: IAssetRow, schema: ISchemaRow) => {
	const objectSchema = ObjectSchema(schema.format);
	const mutable_deserialized_data = deserialize(
		asset.mutable_serialized_data,
		objectSchema,
	);
	const immutable_deserialized_data = deserialize(
		asset.immutable_serialized_data,
		objectSchema,
	);

	return {
		...asset,
		immutable_deserialized_data,
		mutable_deserialized_data,
	};
};

export const getAsset = async (
	client: Client,
	account: string,
	assetId: string,
	doDeserializeAsset = true,
) => {
	try {
		const { provider } = client;
		const { atomicContract } = client.network.config.atomic;

		const { rows } = await provider.v1.chain.get_table_rows({
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
		}
		return asset;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
