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
     * Retrieve atomic assets from the atomicassets contract 
     * @returns {Promise<any>} Returns the atomic assets config
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
     * 
     * @param assetId 
     */
    getAsset = async (owner: string, assetId: string): Promise<AtomicAsset> => {
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: owner,
            table: 'assets',
            limit: 100,
            lower_bound: UInt128.from(assetId),
            upper_bound: UInt128.from(assetId)
        })
        const [ asset ] = rows
        return asset
    }
}
