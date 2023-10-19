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
    getAsset = async (account: string, assetId: string): Promise<AtomicAsset> => {
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: account,
            table: 'assets',
            limit: 100,

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
