import { Api, Serialize, Numeric } from 'eosjs'
import {GetTableRowsResult} from "eosjs/dist/eosjs-rpc-interfaces";
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import Web3 from 'web3';
import { utils } from 'ethers';
const ecc = require('eosjs-ecc')
import BN from 'bn.js';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

function toHex(str) {
  var result = '';
  for (var i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export class Force {
  config: any;
  api: Api;
  web3: Web3;

  constructor(api: Api, web3?: Web3) {
    this.api = api;
    this.web3 = web3;

    // TODO: replace this with proper config
    this.config = {
      FORCE_CONTRACT:"forceonkylin",
      IPFS_NODE: 'https://ipfs.effect.ai',
      EFX_TOKEN_ACCOUNT:"tokenonkylin",
      EFX_SYMBOL:"UTL",
      EFX_PRECISION: 4,
      EOS_RELAYER:"pixeos1gswap",
      EOS_RELAYER_PERMISSION:"active",
    }
  }

  /**
   * get pending balance
   * @param accountId ID of  the given acccount
   * @returns the payment rows of the given `accountId`
   */
  getPendingBalance = async (accountId: number): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.FORCE_CONTRACT,
      scope: this.config.FORCE_CONTRACT,
      table: 'payment',
      index_position: 3,
      key_type: 'i64',
      lower_bound: accountId,
      upper_bound: accountId
    }

    return await this.api.rpc.get_table_rows(config)
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
      table: 'campaign',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }
    const data = await this.api.rpc.get_table_rows(config)

    return data;
  }

  /**
   * Get reservations
   * @returns - Submission Table Rows Result
   */
  getReservations = async (): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.FORCE_CONTRACT,
      scope: this.config.FORCE_CONTRACT,
      table: 'submission',
    }
    const data = await this.api.rpc.get_table_rows(config)

    return data;
  }

  /**
   * Get force campaigns
   * @param nextKey - key to start searching from
   * @param limit - max number of rows to return
   * @returns - Campaign Table Rows Result
   */
  getBatches = async (nextKey, limit = 20): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.FORCE_CONTRACT,
      scope: this.config.FORCE_CONTRACT,
      table: 'batch',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }
    const data = await this.api.rpc.get_table_rows(config)

    return data;
  }

  campaignJoin = async (accountId: number, campaignId: number): Promise<GetTableRowsResult> => {
    const key = this.getCompositeKey(accountId, campaignId)

    const config = {
      code: this.config.FORCE_CONTRACT,
      scope: this.config.FORCE_CONTRACT,
      table: 'campaignjoin',
      key_type: 'i64',
      lower_bound: key,
      upper_bound: key,
    }

    return await this.api.rpc.get_table_rows(config)
  }

  joinCampaign = async (owner:string, permission: string, accountId: number, campaignId:number): Promise<object> => {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.FORCE_CONTRACT,
          name: 'joincampaign',
          authorization: [{
            actor: owner,
            permission: permission,
          }],
          data: {
            account_id: accountId,
            campaign_id: campaignId,
            payer: owner,
            sig: null,
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
  getMerkleRoot = (dataArray) => {
    const leaves = dataArray.map(x => SHA256(JSON.stringify(x)))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')

    console.log(tree.toString())
    return root
  }
  createBatch = async (campaignOwner, permission, campaignId, batchId, content, repetitions): Promise<object> => {
    const hash = await this.uploadCampaign(content)
    const merkleRoot = this.getMerkleRoot(content.tasks)
    console.log(typeof campaignId, typeof batchId)
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.FORCE_CONTRACT,
          name: 'mkbatch',
          authorization: [{
            actor: this.isBscAddress(campaignOwner) ? this.config.EOS_RELAYER : campaignOwner,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {
            id: batchId,
            campaign_id: campaignId,
            content: {field_0: 0, field_1: hash},
            task_merkle_root: merkleRoot,
            num_tasks: content.tasks.length,
            payer: this.isBscAddress(campaignOwner) ? this.config.EOS_RELAYER : campaignOwner,
            sig: null,
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
  createCampaign = async (owner: string, accountId: number, nonce: number, hash: string, quantity: string, permission: string): Promise<object> => {
    try {
      let sig;

      if(this.isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(2)
        serialbuff.pushUint32(nonce)
        serialbuff.pushArray(Numeric.decimalToBinary(8, accountId.toString()))
        serialbuff.pushName(this.config.FORCE_CONTRACT)
        serialbuff.pushAsset(quantity + ' ' + this.config.EFX_SYMBOL)
        serialbuff.pushName(this.config.EFX_TOKEN_ACCOUNT)

        const bytes = serialbuff.asUint8Array()

        let paramsHash = ec.hash().update(bytes).digest()
        paramsHash = Serialize.arrayToHex(paramsHash)

        try {
          sig = await this.web3.eth.sign('0x'+paramsHash, owner)
          console.log('sig sig', sig)
        } catch (error) {
          console.error(error)
          return Promise.reject(error)
        }

        sig = utils.splitSignature(sig)
        console.log('sig sig2', sig)
        // TODO: figure out how to get Signature in right format without this hack
        sig.r = new BN(sig.r.substring(2),16)
        sig.s = new BN(sig.s.substring(2), 16)
        sig = Signature.fromElliptic(sig, 0)
      }

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
            payer: this.isBscAddress(owner) ? this.config.EOS_RELAYER : owner,
            sig: sig ? sig.toString() : null,
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

  reserveTask = async (user: string, permission: string, batchId: number, taskIndex: number, campaignId: number, accountId: number, tasks: Array<any>) => {
    const buf2hex = x => x.toString('hex')
    const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

    const leaves = tasks.map(x => sha256(JSON.stringify(x)))
    const tree = new MerkleTree(leaves, sha256)
    const proof = tree.getProof(leaves[taskIndex])
    const hexproof = proof.map(x => buf2hex(x.data))
    const pos = proof.map(x => (x.position === 'right') ? 1 : 0)

    return await this.api.transact({
      actions: [{
        account: this.config.FORCE_CONTRACT,
        name: 'reservetask',
        authorization: [{
          actor: this.isBscAddress(user) ? this.config.EOS_RELAYER : user,
          permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
        }],
        data: {
          proof: hexproof,
          position: pos,
          data: toHex(JSON.stringify(tasks[taskIndex])),
          campaign_id: campaignId,
          batch_id: batchId,
          account_id: accountId,
          payer: this.isBscAddress(user) ? this.config.EOS_RELAYER : user,
          sig: null,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

  }

  submitTask = async (user: string, permission: string, batchId: number, submissionId: number, data: string, accountId: number) => {
    return await this.api.transact({
      actions: [{
        account: this.config.FORCE_CONTRACT,
        name: 'submittask',
        authorization: [{
          actor: this.isBscAddress(user) ? this.config.EOS_RELAYER : user,
          permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
        }],
        data: {
          task_id: submissionId,
          data: data,
          account_id: accountId,
          batch_id: batchId,
          payer: this.isBscAddress(user) ? this.config.EOS_RELAYER : user,
          sig: null,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

  }

  getTaskIndexFromLeaf = async function (leafHash: string, tasks: Array<object>): Promise<Number>{
    const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

    const leaves = tasks.map(x => sha256(JSON.stringify(x)))
    const tree = new MerkleTree(leaves, sha256)
    const treeLeaves = tree.getHexLeaves()
    let taskIndex;

    for (let i = 0; i < treeLeaves.length; i++) {
      if(treeLeaves[i].substring(2) === leafHash) {
        taskIndex = i
      }
    }
    return taskIndex
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
  /**
   * Create composite key with `account id` and `campaign id`
   * @param accountId ID of account logged in
   * @param campaignId ID of the campaign
   * @returns uint 64 bit number
   */
  getCompositeKey = (accountId: number, campaignId: number) => {
    const buf = new Serialize.SerialBuffer()
    buf.reserve(64)
    buf.pushUint32(accountId)
    buf.pushUint32(campaignId)
    return Numeric.binaryToDecimal(buf.getUint8Array(8))
  }
}
