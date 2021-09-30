import { Api } from 'eosjs'
import {GetTableRowsResult} from "eosjs/dist/eosjs-rpc-interfaces";
const BN = require('bn.js');

export class Force {
  config: any;
  api: Api;

  constructor(api: Api) {
    this.api = api;
    // TODO: replace this with proper config
    this.config = {
      FORCE_CONTRACT:"propsonkylin"
    }
  }

  /**
   * Get force campaigns
   * @param nextKey - key to start searching from
   * @param limit - max number of rows to return
   * @returns - Campaign Table Rows Result
   */
  getCampaigns = async (nextKey, limit = 20): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.FORCE_CONTRACT,
      scope: this.config.FORCE_CONTRACT,
      table: 'proposal', // 'campaign',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }
    const data = await this.api.rpc.get_table_rows(config)

    return data;
  }
}
