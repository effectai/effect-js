import { UInt128 } from "@wharfkit/antelope";
import { type Client } from "../client";
import { AtomicAsset } from "../types/campaign";

/**
 * AtomicAssetsService
 * 
 * This service is used to interact with the atomicassets contract.
 *
 * Read more on the atomicassets contracts here:
 * https://github.com/pinknetworkx/atomicassets-contract/wiki/
 */
export class AtomicAssetsService {
    constructor (private readonly client: Client) {}

    /**
     * Retrieve atomic assets from the atomicassets contract  for the given account
     * @param account eosio account name
     * @returns {Promise<AtomicAsset[]>} Returns an array of atomic assets
     */
    getAccountAssets = async (account: string): Promise<AtomicAsset[]> => {
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: account,
            table: 'assets',
            limit: 100
        })
        return rows
    }

    /**
     * Retrieve atomic assets from the atomicassets contract
     * @param account eosio account name
     * @param assetId 
     * @returns {Promise<AtomicAsset>} Returns the atomic asset config
     */
    getAsset = async (account: string, assetId: string, deserializeAsset: boolean = true): Promise<AtomicAsset> => {
        try {
            const { rows }: { rows: AtomicAsset[] } = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.atomicAssetsContract,
                scope: account,
                table: 'assets',
                limit: 1,
                lower_bound: UInt128.from(assetId),
                upper_bound: UInt128.from(assetId)
            })
            const [ asset ] = rows
            if (deserializeAsset) {
                const schema = await this.getSchema(asset.collection_name, asset.schema_name)
                const objectSchema = ObjectSchema(schema.format)
                const mutable_deserialized_data = deserialize(asset.mutable_serialized_data, objectSchema)
                const immutable_deserialized_data = deserialize(asset.immutable_serialized_data, objectSchema)
                return { ...asset, immutable_deserialized_data, mutable_deserialized_data }
            } else {
                return asset
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // TODO: Figure out if there is a collection that ever has a schema with more than 100 rows
    getCollection = async (collectionName: string): Promise<any> => {
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: collectionName,
            table: 'collections',
            limit: 100,
        })
        // console.debug('getCollection', rows)
        return rows
    }

    getSchema = async (collectionName: string, schemaName: string): Promise<AtomicAssetSchema> => {
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: collectionName,
            table: 'schemas',
            limit: 100
        })
        const schema = rows.find((schema: AtomicAssetSchema) => schema.schema_name === schemaName)
        return schema
    }

    /**
     * TODO
     * Mint an asset to the given account
     */
    mintAsset = async (): Promise<any> => {}
}
