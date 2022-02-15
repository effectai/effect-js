import { v4 as uuidv4 } from 'uuid';
import { BaseContract } from './../base-contract/baseContract';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize, Numeric } from 'eosjs';
import { GetTableRowsResult, PushTransactionArgs, ReadOnlyTransactResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js/core';
import { isBscAddress } from '../utils/bscAddress'
import { convertToAsset, parseAsset } from '../utils/asset'
import { getCompositeKey } from '../utils/compositeKey'
import { TransactResult } from 'eosjs/dist/eosjs-api-interfaces';
import { Task } from '../types/task';
import ecc from 'eosjs-ecc';
import { Signature } from 'eosjs/dist/Signature';
import { Campaign } from '../types/campaign';
import { Batch } from '../types/batch';
import retry from 'async-retry'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


/**
 * The Force class is responsible for interacting with the campaigns, templates, batches and tasks on the platform.
 * It is used for campaign creation, publishing and related campaign functions.
 * These are the main methods that are needed in order to interact with Effect Network.
 *
 */
export class Force extends BaseContract {
  constructor(api: Api, configuration: EffectClientConfig) {
    super(api, configuration);
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
   * Get Force Campaigns
   * @param nextKey - key to start searching from
   * @param limit - max number of rows to return
   * @param processCampaign - get campaign content from ipfs
   * @returns - Campaign Table Rows Result
   */
  getCampaigns = async (nextKey, limit = 20, processCampaign: boolean = true): Promise<GetTableRowsResult> => {
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
    const campaigns = await this.api.rpc.get_table_rows(config)

    if (processCampaign) {
      // Get Campaign Info.
      for (let i = 0; i < campaigns.rows.length; i++) {
        campaigns.rows[i] = await this.processCampaign(campaigns.rows[i])
      }
    }

    return campaigns;
  }

  /**
   * Get Campaign
   * @param id - id of campaign
   * @param processCampaign - get campaign content from ipfs
   * @returns Campaign
   */
  getCampaign = async (id: number, processCampaign: boolean = true): Promise<Campaign> => {
    const config = {
      code: this.config.force_contract,
      scope: this.config.force_contract,
      table: 'campaign',
      key_type: 'i64',
      lower_bound: id,
      upper_bound: id,
    }

    let campaign = (await this.api.rpc.get_table_rows(config)).rows[0]
    if (processCampaign) {
      campaign = await this.processCampaign(campaign)
    }

    return campaign
  }

  /**
   * Get Last Campaign of connected account
   * @param processCampaign - get campaign content from ipfs
   * @returns Campaign
   */
  getMyLastCampaign = async (processCampaign: boolean = true): Promise<Campaign> => {
    try {
      const config = {
        code: this.config.force_contract,
        scope: this.config.force_contract,
        table: 'campaign',
        key_type: 'i64',
        limit: 20,
        reverse: true
      }

      const campaigns = await this.api.rpc.get_table_rows(config)

      let campaign: Campaign
      for (let c of campaigns.rows) {
        if (this.effectAccount.accountName === c.owner[1]) {
          campaign = c
          break;
        }
      }

      if (processCampaign) {
        campaign = await this.processCampaign(campaign)
      }

      return campaign
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * processCampaign
   * @param campaign
   * @returns
   */
  processCampaign = async (campaign: Campaign): Promise<Campaign> => {
    try {
      // field_0 represents the content type where:
      // 0: IPFS
      if (campaign.content.field_0 === 0 && campaign.content.field_1 !== '') {
        // field_1 represents the IPFS hash
        campaign.info = await this.getIpfsContent(campaign.content.field_1)
      }
    } catch (e) {
      campaign.info = null
      console.error('processCampaign', e)
    }
    return campaign
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

  getSubmissions = async (nextKey, limit:number = 20): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.force_contract,
      scope: this.config.force_contract,
      table: 'submission',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }
    const submissions = await this.api.rpc.get_table_rows(config)

    return submissions;
  }

  /**
   * Get reservations of connected user
   * @returns
   */
  getMyReservations = async (): Promise<Array<Task>> => {
    try {
      const submissions = await this.getReservations()

      const reservations = []
      submissions.rows.forEach(sub => {
        if (this.effectAccount.vAccountRows[0].id === parseInt(sub.account_id)) {
          if (!sub.data) {
            reservations.push(sub)
          }
        }
      });

      return reservations;
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Get submissions of batch
   * @param batchId 
   * @param category , can be all, submissions or reservations
   * @returns 
   */
  getSubmissionsOfBatch = async (batchId: number, category = 'all'): Promise<Array<Task>> => {
    const submissions = await this.getReservations()
    const batchSubmissions = []
    submissions.rows.forEach(sub => {
      if (batchId === parseInt(sub.batch_id)) {
        if (category === 'all') {
          batchSubmissions.push(sub)
        } else if (category === 'reservations' && !sub.data ) {
          batchSubmissions.push(sub)
        } else if (category === 'submissions' && sub.data) {
          batchSubmissions.push(sub)
        }
      }
    });

    return batchSubmissions;
  } 

  /**
   * OLD
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

    let task: Task | PromiseLike<Task>;
    submissions.rows.forEach(sub => {
      if (leafHash === sub.leaf_hash && sub.data) {
        task = sub
      }
    });

    return task;
  }

  /**
   * Poll individual task result
   * @param leafHash leaf hash of task
   * @param taskResultFound callback function
   * @param maxTimeout in milliseconds, default 1200000
   * @param interval between retries in milliseconds, default 10000
   */
  pollTaskResult = async (leafHash: string, taskResultFound: Function, maxTimeout = 120000, interval = 10000): Promise<any> => {
    await retry(async () => {
      const submissions = await this.getReservations()
      for (let sub of submissions.rows) {
        if (leafHash === sub.leaf_hash && sub.data) {
          return taskResultFound(sub)
        }
      }
      console.log(`Task ${leafHash} not found yet...`)
      throw new Error(`Task ${leafHash} not found yet...`)
    }, {
        retries: Math.round(maxTimeout / interval),
        factor: 1,
        randomize: false,
        minTimeout: interval
    })
  }

  /**
   * Get campaign batches
   * @param nextKey - key to start searching from
   * @param limit - max number of rows to return
   * @returns - Batch Table Rows Result
   */
  getBatches = async (nextKey, limit:number = 20, processBatch:boolean = false): Promise<GetTableRowsResult> => {
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
    const batches = await this.api.rpc.get_table_rows(config)

    batches.rows.forEach(batch => {
      batch.batch_id = getCompositeKey(batch.id, batch.campaign_id)
    });

    if (processBatch) {
      // Get Batch Reservations
      for (let i = 0; i < batches.rows.length; i++) {
        // batches.rows[i].reservations = await this.getSubmissionsOfBatch(batches.rows[i].batch_id, 'reservations')
      }
    }

    return batches;
  }

  /**
   * Get Batches for Campaign
   * @param campaignId
   * @returns
   */
  getCampaignBatches = async (campaignId: number): Promise<Array<Batch>> => {
    const batches = await this.getBatches('', -1)

    const campaignBatches = []
    
    batches.rows.forEach(batch => {
      if (campaignId === parseInt(batch.campaign_id)) {
        campaignBatches.push(batch)
      }
    });

    return campaignBatches;
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
   * Join a force Campaign.
   * @param campaignId
   * @returns transaction result
   */
  joinCampaign = async (campaignId: number, sendTransaction = true): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs | Object> => {
    try {
      let sig: Signature
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(7)
        serialbuff.pushUint32(campaignId)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
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
        }
      }
      if (sendTransaction) {
        return await this.sendTransaction(owner, action);
      } else {
        return action
      }

    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Combined joinCampaign and reserve task actions in one transaction to improve user experience in Effect Force.
   * @param campaignId
   * @param batchId
   * @param taskIndex
   * @param tasks
   * @returns
   */
  joinCampaignAndReserveTask = async (campaignId: number, batchId: number, taskIndex: number, tasks: Array<any>): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    const actions: Array<Object> = []
    try {
      actions.push(await this.joinCampaign(campaignId, false))
      // sleep needed to make sure the next metamask popup opens
      await sleep(500)
      actions.push(await this.reserveTask(batchId, taskIndex, campaignId, tasks, false))
      return await this.sendTransaction(this.effectAccount.accountName, actions);
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
    try {
      const stringify = JSON.stringify(campaignIpfs)
      const blob = new this.blob([stringify], { type: 'text/json' })
      const formData = new this.formData()
      formData.append('file', await blob.text())

      if (blob.size > 10000000) {
        throw 'Max file size allowed is 10 MB'
      } else {
        const requestOptions: RequestInit = {
          method: 'POST',
          body: formData
        }
        const response = await this.fetch(`${this.config.ipfs_node}/api/v0/add?pin=true`, requestOptions)
        const campaign = await response.json()
        return campaign.Hash as string
      }
    } catch (err) {
      console.error(`🔥🔥🔥: ${err}`)
      return new Error(err).message
    }
  }

  /**
   * Get the the root hash of a merkle tree given the leaf data
   * @param campaignId the campaign to create the merkle root for
   * @param batchId the batch to create the merkle root for
   * @param dataArray task data
   * @returns root of merkle tree
   */
  getMerkleTree = (campaignId: number, batchId: number, dataArray: object[]) : any => {
    const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')
    const prefixle = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create([campaignId, batchId], 8))
    const prefixbe = CryptoJS.enc.Hex.parse(prefixle.match(/../g).reverse().join(''))

    const leaves = dataArray.map(x => SHA256(prefixbe.clone().concat(CryptoJS.enc.Utf8.parse(JSON.stringify(x)))))
    const tree = new MerkleTree(leaves, sha256)

    return { root: tree.getRoot().toString('hex'), tree, leaves: tree.getHexLeaves() }
  }

  /**
   * Creates a batch on a Campaign.
   * @param campaignId
   * @param batchId
   * @param content
   * @returns transaction result
   */
  createBatch = async (campaignId: number, content, repetitions: number): Promise<any> => {
    try {
      let sig: Signature
      let batchId: number = 0

      const batches = await this.getCampaignBatches(campaignId);
      if (batches.length) {
        batchId = parseInt(Math.max.apply(Math, batches.map(function(b) { return b.id; }))) + 1
      }

      for (let i in content.tasks) {
        content.tasks[i].link_id = uuidv4();
      }
      const hash = await this.uploadCampaign(content)
      const {root, leaves} = this.getMerkleTree(campaignId, batchId, content.tasks)
      const campaignOwner = this.effectAccount.accountName

      if (isBscAddress(campaignOwner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(8)
        serialbuff.pushUint32(batchId)
        serialbuff.pushUint32(campaignId)
        serialbuff.push(0)
        serialbuff.pushString(hash)
        serialbuff.pushUint8ArrayChecked(Serialize.hexToUint8Array(root), 32)

        sig = await this.generateSignature(serialbuff)
      }

      const campaign = await this.getCampaign(campaignId)
      const [reward, symbol] = parseAsset(campaign.reward.quantity)
      const batchPrice = reward * content.tasks.length * repetitions

      // TODO: below code copied from vaccount module, can we just call that code?
      let vaccSig: Signature;
      await this.updatevAccountRows()
      const amount = convertToAsset(batchPrice.toString())
      const fromAccount = this.effectAccount.accountName
      const toAccountId = this.config.force_vaccount_id
      const fromAccountId = this.effectAccount.vAccountRows[0].id
      const nonce = this.effectAccount.vAccountRows[0].nonce
      if (isBscAddress(fromAccount)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(1)
        serialbuff.pushUint32(nonce)
        serialbuff.pushArray(Numeric.decimalToBinary(8, fromAccountId.toString()))
        serialbuff.pushArray(Numeric.decimalToBinary(8, toAccountId.toString()))
        serialbuff.pushAsset(amount + ' ' + this.config.efx_symbol)
        serialbuff.pushName(this.config.efx_token_account)

        vaccSig = await this.generateSignature(serialbuff)
      }

      let batchPk = getCompositeKey(batchId, campaignId)

      const authorization = [{
        actor: isBscAddress(campaignOwner) ? this.config.eos_relayer : campaignOwner,
        permission: isBscAddress(campaignOwner) ? this.config.eos_relayer_permission : this.effectAccount.permission
      }]

      const actions = [{
        account: this.config.force_contract,
        name: 'mkbatch',
        authorization,
        data: {
          id: batchId,
          campaign_id: campaignId,
          content: { field_0: 0, field_1: hash },
          task_merkle_root: root,
          repetitions: repetitions,
          payer: isBscAddress(campaignOwner) ? this.config.eos_relayer : campaignOwner,
          sig: isBscAddress(campaignOwner) ? sig.toString() : null
        },
      }, {
        account: this.config.account_contract,
        name: 'vtransfer',
        authorization,
        data: {
          from_id: fromAccountId,
          to_id: toAccountId,
          quantity: {
            quantity: amount + ' ' + this.config.efx_symbol,
            contract: this.config.efx_token_account,
          },
          sig: isBscAddress(fromAccount) ? vaccSig.toString() : null,
          fee: null,
          memo: batchPk
        },
      }, {
        account: this.config.force_contract,
        name: 'publishbatch',
        authorization,
        data: {
          account_id: this.effectAccount.vAccountRows[0].id,
          batch_id: batchPk,
          num_tasks: content.tasks.length,
          sig: null
        },
      }]
      const transaction = await this.sendTransaction(campaignOwner, actions);
      return {
        transaction,
        id: batchId,
        leaves

      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * deletes a batch from a force Campaign.
   * @param campaignId existing campaign ID
   * @returns transaction result
   */
  deleteBatch = async (id: number, campaignId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(12)
        serialbuff.pushUint32(id)
        serialbuff.pushUint32(campaignId)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
        account: this.config.force_contract,
        name: 'rmbatch',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
          permission: isBscAddress(owner) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          id: id,
          campaign_id: campaignId,
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      }

      return await this.sendTransaction(owner, action)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * creates a force Campaign.
   * @param hash campaign data on IPFS
   * @param quantity the amount of tokens rewarded
   * @returns transaction result
   */
  createCampaign = async (hash: string, quantity: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(9)
        serialbuff.push(0)
        serialbuff.pushString(hash)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
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
        }
      }

      return await this.sendTransaction(owner, action)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * updates a force Campaign.
   * @param campaignId existing campaign ID
   * @param hash campaign data on IPFS
   * @param quantity the amount of tokens rewarded
   * @returns transaction result
   */
   editCampaign = async (campaignId: number, hash: string, quantity: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(10)
        serialbuff.pushUint32(campaignId)
        serialbuff.push(0)
        serialbuff.pushString(hash)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
        account: this.config.force_contract,
        name: 'editcampaign',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
          permission: isBscAddress(owner) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          campaign_id: campaignId,
          owner: [isBscAddress(owner) ? 'address' : 'name', owner],
          content: { field_0: 0, field_1: hash },
          reward: {
            quantity: convertToAsset(quantity) + ' ' + this.config.efx_symbol,
            contract: this.config.efx_token_account
          },
          payer: isBscAddress(owner) ? this.config.eos_relayer : owner,
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      }

      return await this.sendTransaction(owner, action)
    } catch (err) {
      throw new Error(err)
    }
  }

    /**
   * deletes a force Campaign.
   * @param campaignId existing campaign ID
   * @returns transaction result
   */
     deleteCampaign = async (campaignId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
      try {
        let sig: Signature
        const owner = this.effectAccount.accountName
  
        if (isBscAddress(owner)) {
          const serialbuff = new Serialize.SerialBuffer()
          serialbuff.push(11)
          serialbuff.pushUint32(campaignId)
  
          sig = await this.generateSignature(serialbuff)
        }
  
        const action = {
          account: this.config.force_contract,
          name: 'rmcampaign',
          authorization: [{
            actor: isBscAddress(owner) ? this.config.eos_relayer : owner,
            permission: isBscAddress(owner) ? this.config.eos_relayer_permission : this.effectAccount.permission
          }],
          data: {
            campaign_id: campaignId,
            owner: [isBscAddress(owner) ? 'address' : 'name', owner],
            sig: isBscAddress(owner) ? sig.toString() : null
          }
        }
  
        return await this.sendTransaction(owner, action)
      } catch (err) {
        throw new Error(err)
      }
    }

  /**
   * Makes a campaign (uploadCampaign & createCampaign combined)
   * @param content 
   * @param quantity 
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
   * reserve a task in a batch
   * @param batchId 
   * @param taskIndex 
   * @param campaignId 
   * @param tasks 
   * @returns 
   */
  reserveTask = async (batchId: number, taskIndex: number, campaignId: number, tasks: Array<any>, sendTransaction = true): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs | Object> => {
    try {
      let sig: Signature

      const user = this.effectAccount.accountName
      const accountId = this.effectAccount.vAccountRows[0].id

      const buf2hex = x => x.toString('hex')
      const hex2bytes = x => Serialize.hexToUint8Array(x)
      const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

      const prefixle = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create([campaignId, batchId], 8))
      const prefixbe = CryptoJS.enc.Hex.parse(prefixle.match(/../g).reverse().join(''))

      const leaves = tasks.map(x => SHA256(prefixbe.clone().concat(CryptoJS.enc.Utf8.parse(JSON.stringify(x)))))

      const tree = new MerkleTree(leaves, sha256)
      const proof = tree.getProof(leaves[taskIndex])
      const hexproof = proof.map(x => buf2hex(x.data))
      const pos = proof.map(x => (x.position === 'right') ? 1 : 0)

      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(6)
        serialbuff.pushUint8ArrayChecked(hex2bytes(CryptoJS.enc.Hex.stringify(leaves[taskIndex])), 32)
        serialbuff.pushUint32(campaignId)
        serialbuff.pushUint32(batchId)
        sig = await this.generateSignature(serialbuff)
      }

      const action = {
        account: this.config.force_contract,
        name: 'reservetask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          proof: hexproof,
          position: pos,
          data: CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(tasks[taskIndex]))),
          campaign_id: campaignId,
          batch_id: batchId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? sig.toString() : null
        }
      }

      if (sendTransaction) {
        return await this.sendTransaction(user, action);
      } else {
        return action
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * release and reclaim expired task.
   * @param taskId 
   */
  claimExpiredTask = async (taskId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let releaseSig: Signature, reclaimSig: Signature 

      const user = this.effectAccount.accountName
      const accountId = this.effectAccount.vAccountRows[0].id

      if (isBscAddress(user)) {
        const releaseBuff = new Serialize.SerialBuffer()
        releaseBuff.push(14)
        releaseBuff.pushNumberAsUint64(taskId)
        releaseBuff.pushUint32(accountId)

        const reclaimBuff = new Serialize.SerialBuffer()
        reclaimBuff.push(15)
        reclaimBuff.pushNumberAsUint64(taskId)
        reclaimBuff.pushUint32(accountId)
        
        releaseSig = await this.generateSignature(releaseBuff)
        reclaimSig = await this.generateSignature(reclaimBuff)
      }

      const actions = [{
        account: this.config.force_contract,
        name: 'releasetask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          task_id: taskId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? releaseSig.toString() : null
        }
      },{
        account: this.config.force_contract,
        name: 'reclaimtask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          task_id: taskId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? reclaimSig.toString() : null
        }
      }]
      return await this.sendTransaction(user, actions);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Release a task reservation.
   * @param taskId 
   * @returns 
   */
  releaseTask = async (taskId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature

      const user = this.effectAccount.accountName
      const accountId = this.effectAccount.vAccountRows[0].id

      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(14)
        serialbuff.pushNumberAsUint64(taskId)
        serialbuff.pushUint32(accountId)

        sig = await this.generateSignature(serialbuff)
      }

      const action = [{
        account: this.config.force_contract,
        name: 'releasetask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          task_id: taskId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? sig.toString() : null
        }
      }]
      return await this.sendTransaction(user, action);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Reclaim a released task reservation.
   * @param taskId 
   * @returns 
   */
   reclaimTask = async (taskId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature

      const user = this.effectAccount.accountName
      const accountId = this.effectAccount.vAccountRows[0].id

      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(15)
        serialbuff.pushNumberAsUint64(taskId)
        serialbuff.pushUint32(accountId)

        sig = await this.generateSignature(serialbuff)
      }

      const action = [{
        account: this.config.force_contract,
        name: 'reclaimtask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eos_relayer : user,
          permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
        }],
        data: {
          task_id: taskId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eos_relayer : user,
          sig: isBscAddress(user) ? sig.toString() : null
        }
      }]
      return await this.sendTransaction(user, action);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Submits a Task in a Batch
   * @param batchId 
   * @param submissionId 
   * @param data 
   * @param accountId 
   * @returns 
   */
  submitTask = async (batchId: number, submissionId: number, data: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature
      const accountId = this.effectAccount.vAccountRows[0].id
      const user = this.effectAccount.accountName
      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(5)
        serialbuff.pushNumberAsUint64(submissionId)
        serialbuff.pushString(data)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
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
        }
      }
      return await this.sendTransaction(user, action);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Receive tokens from completed tasks.
   * @param paymentId
   * @returns 
   */
  payout = async (): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let sig: Signature
      let actions = []
      const accountId = this.effectAccount.vAccountRows[0].id
      const user = this.effectAccount.accountName
      const payments = await this.getPendingBalance(accountId)

      if (isBscAddress(user)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(13)
        serialbuff.pushUint32(accountId)

        sig = await this.generateSignature(serialbuff)
      }

      if (payments) {
        for (const payment of payments.rows) {
          // payout is only possible after x amount of days have passed since the last_submission_time
          if (((new Date(new Date(payment.last_submission_time) + 'UTC').getTime() / 1000) + this.config.payout_delay_sec) < ((Date.now() / 1000))) {
            if(payment.amount_paid > 0) {
              actions.push({
                account: this.config.force_contract,
                name: 'payout',
                authorization: [{
                  actor: isBscAddress(user) ? this.config.eos_relayer : user,
                  permission: isBscAddress(user) ? this.config.eos_relayer_permission : this.effectAccount.permission
                }],
                data: {
                  payment_id: payment.id,
                  sig: isBscAddress(user) ? sig.toString() : null
                }
              })
            }
          }
        }
      } else {
        throw new Error('No pending payouts found');
      }
      return await this.sendTransaction(user, actions);
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * Get task index from merkle leaf
   * @param leafHash 
   * @param tasks 
   * @returns 
   */
  getTaskIndexFromLeaf = async function (campaignId: number, batchId:number, leafHash: string, tasks: Array<Task>): Promise<number> {
    const prefixle = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create([campaignId, batchId], 8))
    const prefixbe = CryptoJS.enc.Hex.parse(prefixle.match(/../g).reverse().join(''))
    const sha256 = (x: string) => Buffer.from(ecc.sha256(x), 'hex')

    const leaves = tasks.map(x => SHA256(prefixbe.clone().concat(CryptoJS.enc.Utf8.parse(JSON.stringify(x)))))
    const tree = new MerkleTree(leaves, sha256)
    const treeLeaves = tree.getHexLeaves()
    let taskIndex: number;

    for (let i = 0; i < treeLeaves.length; i++) {
      if (treeLeaves[i].substring(2) === leafHash) {
        taskIndex = i
      }
    }
    return taskIndex
  }
}
