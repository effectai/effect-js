import { defaultConfiguration } from './../config/config';
import { EffectApiError } from './../types/error';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize } from 'eosjs';
import {GetTableRowsResult} from "eosjs/dist/eosjs-rpc-interfaces";
import Web3 from 'web3';
import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import { isBscAddress, generateSignature } from '../utils/bscAddress';
import { convertToAsset } from '../utils/asset';
import { getCompositeKey } from '../utils/compositeKey';
import { stringToHex } from '../utils/hex';
const ecc = require('eosjs-ecc');

/**
 * The Force class is responsible for interacting with the campaigns, templates, batches and tasks on the platform.
 * It is used for campaign creation, publishing and related campaign functions. 
 * These are the main methods that are needed in order to interact with Effect Network.
 * 
 */
export class Force {
  api: Api;
  web3: Web3;
  config: EffectClientConfig;

  constructor(api: Api, environment:string, configuration?: EffectClientConfig, web3?: Web3) {
    this.api = api;
    this.web3 = configuration.web3 || web3;
    this.config = defaultConfiguration(environment, configuration);
  }

  /**
   * get pending balance
   * @param accountId ID of  the given acccount
   * @returns the payment rows of the given `accountId`
   */
  getPendingBalance = async (accountId: number): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.force_contract,
      scope: this.config.force_contract,
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
      code: this.config.force_contract,
      scope: this.config.force_contract,
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
      code: this.config.force_contract,
      scope: this.config.force_contract,
      limit: -1,
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
      code: this.config.force_contract,
      scope: this.config.force_contract,
      table: 'batch',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }
    const data = await this.api.rpc.get_table_rows(config)

    data.rows.forEach(batch => {
      batch.batch_id = getCompositeKey(batch.id, batch.campaign_id)
    });

    return data;
  }

  /**
   * get campaign join table
   * @param accountId 
   * @param campaignId 
   * @returns 
   */
  getCampaignJoins = async (accountId: number, campaignId: number): Promise<GetTableRowsResult> => {
    const key = getCompositeKey(accountId, campaignId)

    const config = {
      code: this.config.force_contract,
      scope: this.config.force_contract,
      table: 'campaignjoin',
      key_type: 'i64',
      lower_bound: key,
      upper_bound: key,
    }

    return await this.api.rpc.get_table_rows(config)
  }

  /**
   * Join campaign
   * @param owner 
   * @param accountId 
   * @param campaignId 
   * @param options 
   * @returns 
   */
  joinCampaign = async (owner:string, accountId: number, campaignId:number, options: object): Promise<object> => {
    let sig;

    if(isBscAddress(owner)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(7)
      serialbuff.pushUint32(campaignId)

      sig = await generateSignature(this.web3, serialbuff, options)
    }

    try {
      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'joincampaign',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
          }],
          data: {
            account_id: accountId,
            campaign_id: campaignId,
            payer: isBscAddress(owner) ? this.config.eos_relayer : owner,
            sig: isBscAddress(owner) ? sig.toString() : null,
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

  /**
   * Upload campaign data to ipfs
   * @param campaignIpfs 
   * @returns 
   */
  uploadCampaign = async (campaignIpfs: object): Promise<string> => {
    const blob = new Blob([JSON.stringify(campaignIpfs)], { type: 'text/json' })
    const formData = new FormData()
    formData.append('file', blob)
    if (blob.size > 10000000) {
      alert('Max file size allowed is 10 MB')
    } else {
      try {
        const response = await fetch(`${this.config.ipfs_node}/api/v0/add?pin=true`,
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

  /**
   * 
   * @param campaignOwner
   * @param permission
   * @param campaignId
   * @param batchId
   * @param content
   * @param repetitions
   * @returns
   */
  createBatch = async (owner: string, campaignId: number, batchId:number, content, repetitions, options: object): Promise<object> => {
    try {
      const hash = await this.uploadCampaign(content)
      const merkleRoot = this.getMerkleRoot(content.tasks)

      let sig;
      if(isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(8)
        serialbuff.pushUint32(batchId)
        serialbuff.pushUint32(campaignId)
        serialbuff.push(0)
        serialbuff.pushString(hash)
        serialbuff.pushUint8ArrayChecked(Serialize.hexToUint8Array(merkleRoot), 32)

        sig = await generateSignature(this.web3, serialbuff, options)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'mkbatch',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
          }],
          data: {
            id: batchId,
            campaign_id: campaignId,
            content: {field_0: 0, field_1: hash},
            task_merkle_root: merkleRoot,
            num_tasks: content.tasks.length,
            payer: isBscAddress(owner) ? this.config.eos_relayer : owner,
            sig: isBscAddress(owner) ? sig.toString() : null
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

  /**
   * 
   * @param owner 
   * @param accountId 
   * @param nonce 
   * @param hash 
   * @param quantity 
   * @param options 
   * @returns 
   */
  createCampaign = async (owner: string, accountId: number, nonce: number, hash: string, quantity: string, options: object): Promise<object> => {
    let sig;

    if(isBscAddress(owner)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(9)
      serialbuff.push(0)
      serialbuff.pushString(hash)
      sig = await generateSignature(this.web3, serialbuff, options)
    }
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'mkcampaign',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
          }],
          data: {
            owner: [isBscAddress(owner) ? 'address' : 'name', owner],
            content: {field_0: 0, field_1: hash},
            reward: {
              quantity: convertToAsset(quantity) + ' ' + this.config.efx_symbol,
              contract: this.config.efx_token_account
            },
            payer: isBscAddress(owner) ? this.config.eos_relayer : owner,
            sig: isBscAddress(owner) ? sig.toString() : null,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
    } catch (err) {
      console.log('ERR1', err)
      throw new Error(err)
    }
  }

  /**
   * 
   * @param user 
   * @param batchId 
   * @param taskIndex 
   * @param campaignId 
   * @param accountId 
   * @param tasks 
   * @param options 
   * @returns 
   */
  reserveTask = async (user: string, batchId: number, taskIndex: number, campaignId: number, accountId: number, tasks: Array<any>, options: object) => {
    let leaves = undefined;
    let proof = undefined;
    let hexproof = undefined;
    let pos = undefined;
    let tree = undefined;
    let sig

    try {
      const buf2hex = x => x.toString('hex')
      const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')
  
      leaves = tasks.map(x => sha256(JSON.stringify(x)))
      tree = new MerkleTree(leaves, sha256)
      proof = tree.getProof(leaves[taskIndex])
      hexproof = proof.map(x => buf2hex(x.data))
      pos = proof.map(x => (x.position === 'right') ? 1 : 0)
    } catch(err) {
      console.log('err1: ', err)
    }
   
try {
  if(isBscAddress(user)) {
    const serialbuff = new Serialize.SerialBuffer()
    serialbuff.push(6)
    serialbuff.pushUint8ArrayChecked(leaves[taskIndex], 32)
    serialbuff.pushUint32(campaignId)
    serialbuff.pushUint32(batchId)

    sig = await generateSignature(this.web3, serialbuff, options)
  }
} catch (error) {
  console.log('err2: ', error)
}

    try {
      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'reservetask',
          authorization: [{
            actor: isBscAddress(user) ? this.config.eos_relayer : user,
            permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
          }],
          data: {
            proof: hexproof,
            position: pos,
            data: stringToHex(JSON.stringify(tasks[taskIndex])),
            campaign_id: campaignId,
            batch_id: batchId,
            account_id: accountId,
            payer: isBscAddress(user) ? this.config.eos_relayer : user,
            sig: isBscAddress(user) ? sig.toString() : null,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
    } catch (error) {
      throw new Error(error);
    }

  }

  /**
   * 
   * @param user
   * @param batchId
   * @param submissionId
   * @param data
   * @param accountId
   * @param options
   * @returns
   */
  submitTask = async (user: string, batchId: number, submissionId: number, data: string, accountId: number, options:object) => {
    let sig
    if(isBscAddress(user)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(5)
      serialbuff.pushNumberAsUint64(submissionId)
      serialbuff.pushString(data)

      sig = await generateSignature(this.web3, serialbuff, options)
    }

    return await this.api.transact({
      actions: [{
        account: this.config.force_contract,
        name: 'submittask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
        }],
        data: {
          task_id: submissionId,
          data: data,
          account_id: accountId,
          batch_id: batchId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? sig.toString() : null
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

  }

  getTaskIndexFromLeaf = async function (leafHash: string, tasks: Array<object>): Promise<number>{
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
}
