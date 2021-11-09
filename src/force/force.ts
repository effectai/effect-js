import { BaseContract } from './../base-contract/baseContract';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize } from 'eosjs'
import { GetTableRowsResult, PushTransactionArgs, ReadOnlyTransactResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import { isBscAddress } from '../utils/bscAddress'
import { convertToAsset } from '../utils/asset'
import { getCompositeKey } from '../utils/compositeKey'
import { stringToHex } from '../utils/hex'
import { TransactResult } from 'eosjs/dist/eosjs-api-interfaces';
import { Task } from '../types/task';
const ecc = require('eosjs-ecc')

/**
 * The Force class is responsible for interacting with the campaigns, templates, batches and tasks on the platform.
 * It is used for campaign creation, publishing and related campaign functions. 
 * These are the main methods that are needed in order to interact with Effect Network.
 * 
 */
export class Force extends BaseContract {
  constructor(api: Api, configuration: EffectClientConfig) {
    super(api, configuration)
  }

  /**
   * get pending balance
   * @param accountId ID of  the given acccount
   * @returns the payment rows of the given `accountId`
   */
  getPendingBalance = async (accountId?: number): Promise<GetTableRowsResult> => {
    const id = this.effectAccount ? this.effectAccount.vAccountRows[0].id : accountId
    const config = {
      code: this.config.force_contract,
      scope: this.config.force_contract,
      table: 'payment',
      index_position: 3,
      key_type: 'i64',
      lower_bound: id,
      upper_bound: id
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
    if (this.effectAccount) {
      console.log('Hey account', this.effectAccount)
    }
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
   * Get task submissions of batch
   * @param batchId
   * @returns
   */
  getTaskSubmissionsForBatch = async (batchId: number): Promise<Array<Task>> => {
    const submissions = await this.getReservations()

    const batchSubmissions = []
    submissions.rows.forEach(sub => {
      if (batchId === parseInt(sub.batch_id) && sub.data) {
        batchSubmissions.push(sub)
      }
    });

    return batchSubmissions;
  }

  /**
   * Get individual task result
   * @param leafHash - leafHash of task
   * @returns Task
   */
  getTaskResult = async (leafHash: string): Promise<Task> => {
    const submissions = await this.getReservations()

    let task;
    submissions.rows.forEach(sub => {
      if (leafHash === sub.leaf_hash && sub.data) {
        task = sub
      }
    });

    return task;
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
  getCampaignJoins = async (campaignId: number): Promise<GetTableRowsResult> => {
    const key = getCompositeKey(this.effectAccount.vAccountRows[0].id, campaignId)

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
  joinCampaign = async (campaignId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig;
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(7)
        serialbuff.pushUint32(campaignId)

        sig = await this.generateSignature(serialbuff, this.effectAccount.publicKey)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'joincampaign',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: isBscAddress(owner) ? this.config.eos_relayer_permission : this.effectAccount.permission
          }],
          data: {
            account_id: this.effectAccount.vAccountRows[0].id,
            campaign_id: campaignId,
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
   * Upload campaign data to ipfs
   * @param campaignIpfs 
   * @returns 
   */
  uploadCampaign = async (campaignIpfs: object): Promise<string> => {
    const stringify = JSON.stringify(campaignIpfs)
    const blob = new this.blob([stringify], { type: 'text/json' })
    const formData = new this.formData()
    formData.append('file', blob.arrayBuffer())
  
    if (blob.size > 10000000) {
      alert('Max file size allowed is 10 MB')
    } else {
      try {
        const requestOptions: RequestInit = {
          method: 'POST',
          // @ts-ignore:next-line
          body: formData
        }        
        const response = await this.fetch(`${this.config.ipfs_node}/api/v0/add?pin=true`, requestOptions)
        const campaign = await response.json()
        return campaign as string
      } catch (e) {
        console.error(`🔥🔥🔥: ${e}`)
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
   * @param campaignId
   * @param batchId
   * @param content
   * @param repetitions
   * @returns
   */
  createBatch = async (campaignId: number, batchId: number, content, repetitions): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      const hash = await this.uploadCampaign(content)
      const merkleRoot = this.getMerkleRoot(content.tasks)
      const campaignOwner = this.effectAccount.accountName

      let sig;
      if (isBscAddress(campaignOwner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(8)
        serialbuff.pushUint32(batchId)
        serialbuff.pushUint32(campaignId)
        serialbuff.push(0)
        serialbuff.pushString(hash)
        serialbuff.pushUint8ArrayChecked(Serialize.hexToUint8Array(merkleRoot), 32)

        sig = await this.generateSignature(serialbuff, this.effectAccount.publicKey)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'mkbatch',
          authorization: [{
            actor: isBscAddress(campaignOwner) ? this.config.eos_relayer : campaignOwner,
            permission: isBscAddress(campaignOwner) ? this.config.eos_relayer_permission : this.effectAccount.permission
          }],
          data: {
            id: batchId,
            campaign_id: campaignId,
            content: { field_0: 0, field_1: hash },
            task_merkle_root: merkleRoot,
            num_tasks: content.tasks.length,
            payer: isBscAddress(campaignOwner) ? this.config.eos_relayer : campaignOwner,
            sig: isBscAddress(campaignOwner) ? sig.toString() : null
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
  createCampaign = async (hash: string, quantity: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig;
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(9)
        serialbuff.push(0)
        serialbuff.pushString(hash)

        sig = await this.generateSignature(serialbuff, this.effectAccount.publicKey)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'mkcampaign',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: isBscAddress(owner) ? this.config.eos_relayer_permission : this.effectAccount.permission
          }],
          data: {
            owner: [isBscAddress(owner) ? 'address' : 'name', owner],
            content: { field_0: 0, field_1: hash },
            reward: {
              quantity: convertToAsset(quantity) + ' ' + this.config.efx_symbol,
              contract: this.config.efx_token_account
            },
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
   * Make campaign, uploadCampaign & createCampaign combined
   * @param content
   * @param owner
   * @param accountId
   * @param nonce
   * @param quantity
   * @param options
   * @returns
   */
  makeCampaign = async (content: object, quantity: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      // upload to ipfs
      const hash = await this.uploadCampaign(content)
      // create campaign
      return await this.createCampaign(hash, quantity)
    } catch (err) {
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
  reserveTask = async (batchId: number, taskIndex: number, campaignId: number, tasks: Array<any>): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      const user = this.effectAccount.accountName
      const accountId = this.effectAccount.vAccountRows[0].id

      const buf2hex = x => x.toString('hex')
      const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

      const leaves = tasks.map(x => sha256(JSON.stringify(x)))
      const tree = new MerkleTree(leaves, sha256)
      const proof = tree.getProof(leaves[taskIndex])
      const hexproof = proof.map(x => buf2hex(x.data))
      const pos = proof.map(x => (x.position === 'right') ? 1 : 0)

      let sig
      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(6)
        serialbuff.pushUint8ArrayChecked(leaves[taskIndex], 32)
        serialbuff.pushUint32(campaignId)
        serialbuff.pushUint32(batchId)

        sig = await this.generateSignature(serialbuff, this.effectAccount.publicKey)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'reservetask',
          authorization: [{
            actor: isBscAddress(user) ? this.config.eos_relayer : user,
            permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
          }],
          data: {
            proof: hexproof,
            position: pos,
            data: stringToHex(JSON.stringify(tasks[taskIndex])),
            campaign_id: campaignId,
            batch_id: batchId,
            account_id: accountId,
            payer: isBscAddress(user) ? this.config.eos_relayer : user,
            sig: isBscAddress(user) ? sig.toString() : null
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
  submitTask = async (batchId: number, submissionId: number, data: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig
      const accountId = this.effectAccount.vAccountRows[0].id
      const user = this.effectAccount.accountName
      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(5)
        serialbuff.pushNumberAsUint64(submissionId)
        serialbuff.pushString(data)

        sig = await this.generateSignature(serialbuff, this.effectAccount.publicKey)
      }

      return await this.api.transact({
        actions: [{
          account: this.config.force_contract,
          name: 'submittask',
          authorization: [{
            actor: isBscAddress(user) ? this.config.eos_relayer : user,
            permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
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
    } catch (error) {
      throw new Error(error);
    }

  }

  getTaskIndexFromLeaf = async function (leafHash: string, tasks: Array<object>): Promise<number> {
    const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

    const leaves = tasks.map(x => sha256(JSON.stringify(x)))
    const tree = new MerkleTree(leaves, sha256)
    const treeLeaves = tree.getHexLeaves()
    let taskIndex;

    for (let i = 0; i < treeLeaves.length; i++) {
      if (treeLeaves[i].substring(2) === leafHash) {
        taskIndex = i
      }
    }
    return taskIndex
  }

}
