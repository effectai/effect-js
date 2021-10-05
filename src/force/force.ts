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
      PROPS_CONTRACT:"propsonkylin",
      FORCE_CONTRACT:"forceonkylin",
      IPFS_NODE: 'https://ipfs.effect.ai',
      EFX_TOKEN_ACCOUNT:"tokenonkylin",
      EFX_SYMBOL:"UTL",
      EFX_PRECISION: 4,
      EOS_RELAYER:"testjairtest",
      EOS_RELAYER_PERMISSION:"active",
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
      code: this.config.PROPS_CONTRACT,
      scope: this.config.PROPS_CONTRACT,
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
        return campaign.Hash
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }

  createCampaign = async (owner: string, hash: string, quantity: string, permission: string): Promise<object> => {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.FORCE_CONTRACT,
          name: 'mkcampaign',
          authorization: [{
            actor: this.isBscAddress(owner) ? this.config.EOS_RELAYER : owner,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {      
            owner: [this.isBscAddress(owner) ? 'address' : 'name', owner],
            content: {field_0: 0, field_1: hash},
            reward: {
              quantity: this.convertToAsset(quantity) + ' ' + this.config.EFX_SYMBOL,
              contract: this.config.EFX_TOKEN_ACCOUNT
            },
            payer: this.config.EOS_RELAYER,
            sig: null
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
    } catch (err) {
      throw new Error(err)
    }
  }

  // TODO make these functions global? they are also used in accounts
  /**
   * Check if account is bsc address
   * @param account 
   */
  isBscAddress = (account: string): boolean => {
    return (account.length == 42 || account.length == 40)
  }

  /**
   * Convert amount to asset
   * @param amount
   * @returns 
   * Inspiration from: https://github.com/EOSIO/eosjs/blob/3ef13f3743be9b358c02f47263995eae16201279/src/format.js
   */
  convertToAsset = (amount: string): string => {
    // TODO: add filter for wrong values, e.g -1, or 10.00000
    try {
      const precision = this.config.EFX_PRECISION
      const part = amount.split('.')

      if (part.length === 1) {
        return `${part[0]}.${'0'.repeat(precision)}`
      } else {
        const pad = precision - part[1].length
        return `${part[0]}.${part[1]}${'0'.repeat(pad)}`
      }
    } catch (error) {
      throw Error(error)
    }       
  }

}
