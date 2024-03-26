import { TransactResult } from "@wharfkit/session";
import { type Client } from "../client";
import { AtomicAsset, DaoConfig } from "../types/campaign";
import { SessionNotFoundError } from "../errors";

export class DaoService {
  constructor(private readonly client: Client) {}

  /**
   * Retrieve the DAO config
   * @returns {Promise<DaoConfig>} Returns the DAO config
   */
  getConfig = async (): Promise<DaoConfig> => {
    const { rows } = await this.client.eos.v1.chain.get_table_rows({
      code: this.client.config.daoContract,
      scope: this.client.config.daoContract,
      table: "config",
      limit: 1,
    });
    const [config] = rows;
    return config;
  };

  /**
   * Set the avatar asset for the given account
   * @param asset
   */
  async setAvatarAsset(asset: AtomicAsset): Promise<TransactResult> {
    const { actor, permission, transact } = this.client.useSession();

    const response = await transact({
      actions: [
        {
          account: this.client.config.daoContract,
          name: "setavatar",
          authorization: [
            {
              actor,
              permission,
            },
          ],
          data: {
            account: actor,
            asset_id: asset.asset_id,
          },
        },
      ],
    });

    return response;
  }

  /**
   * Retrieve the avatar for the given account
   * @param account
   * @returns
   * @example { type: 0, asset_id: '2199025109172' }
   */
  async getAvatar(
    account: string,
  ): Promise<{ type: number; asset_id: string }> {
    const response = await this.client.eos.v1.chain.get_table_rows({
      code: this.client.config.daoContract,
      scope: account,
      table: "avatar",
      limit: 1,
    });
    const [avatar] = response.rows;
    return avatar;
  }
}