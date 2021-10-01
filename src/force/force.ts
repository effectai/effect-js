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
      FORCE_CONTRACT:"propsonkylin",
      IPFS_NODE: 'https://ipfs.effect.ai'
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

  uploadCampaign = async (campaignIpfs: object): Promise<string> => {
    const blob = new Blob([JSON.stringify(campaignIpfs)], { type: 'text/json' })
    const formData = new FormData()
    formData.append('file', blob)
    if (blob.size > 10000000) {
      alert('Max file size allowed is 10 MB')
    } else {
      try {
        const response = await fetch(`${this.config.IPFS_NODE}/api/v0/add?pin=true`,
          {
            method: 'POST',
            body: formData
          })
        const campaign = await response.json()
        console.log(campaign)
        return campaign.Hash
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }

  createCampaign = async (): Promise<object> => {
    const actions = []
    
    // TODO transaction to smart contract
    // actions.push(
    //   {
    //     account: process.env.proposalContract,
    //     name: 'createprop',
    //     authorization: [{
    //       actor: this.wallet.auth.accountName,
    //       permission: this.wallet.auth.permission
    //     }],
    //     data: {
    //       author: this.wallet.auth.accountName,
    //       pay: [
    //         {
    //           field_0: {
    //             quantity: Number.parseFloat(this.proposal.reward).toFixed(4) + ' ' + process.env.efxToken,
    //             contract: process.env.tokenContract
    //           },
    //           field_1: payoutTime.toISOString().slice(0, -1)
    //         }],
    //       content_hash: this.proposal.content_hash,
    //       category: parseInt(this.proposal.category),
    //       cycle: parseInt(this.proposal.cycle),
    //       transaction_hash: null
    //     }
    //   }
    // )

    try {
      // do transaction
      return await this.handleTransaction(actions)
    } catch (e) {
      throw new Error(e)
    }
  }

  handleTransaction = async (actions): Promise<object> => {
    try {
      return await this.api.transact({ actions },
        {
          blocksBehind: 3,
          expireSeconds: 60
        });
    } catch (err) {
      throw new Error(err)
    }
  }
}
