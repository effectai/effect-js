import { TransactResult } from "@wharfkit/session";
import { type Client } from "../client";
import { AtomicAsset, DaoConfig } from "../types/campaign";

export class DaoService {
    constructor (private readonly client: Client) {}

    /**
     * Retrieve the DAO config
     * @returns {Promise<DaoConfig>} Returns the DAO config
     */
    getConfig = async (): Promise<DaoConfig> => {
        try {
            const { rows } = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.daoContract,
                scope: this.client.config.daoContract,
                table: 'config',
                limit: 1
            })
            const [ config ] = rows
            return config
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    /**
     * Set the avatar asset for the given account
     * @param asset
     */
    async setAvatarAsset (asset: AtomicAsset): Promise<TransactResult> {
        const authorization = this.client.sessionAuth()
        const response = await this.client.session.transact({
            actions: [{
                  account: this.client.config.daoContract,
                  name: 'setavatar',
                  authorization,
                  data: {
                    account: this.client.session.actor,
                    asset_id: asset.asset_id
                  }
            }]
        })
        return response
    }

    /**
     * Retrieve the avatar for the given account
     * @param account
     * @returns
     * @example { type: 0, asset_id: '2199025109172' }
     */
    async getAvatar (account: string): Promise<{ type: number; asset_id: string}> {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.daoContract,
            scope: account,
            table: 'avatar',
            limit: 1
        })
        const [ avatar ] = response.rows
        return avatar
    }

    /**
     * Retrieve the avatar asset for the given account
     * @param account
     */
    async getAvatarAsset (account: string): Promise<AtomicAsset> {
        const avatar = await this.getAvatar(account)
        const asset = await this.client.atomic.getAsset(account, avatar.asset_id)
        return asset
    }

}
