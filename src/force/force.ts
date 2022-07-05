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
import { Qualification } from '../types/qualifications';
import { exit } from 'process';

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
      code: this.config.forceContract,
      scope: this.config.forceContract,
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
      code: this.config.forceContract,
      scope: this.config.forceContract,
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
      code: this.config.forceContract,
      scope: this.config.forceContract,
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
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
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

  getSubmissions = async (nextKey, limit:number = 20): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
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
   * Get submissions of batch
   * @param batchId
   * @param category , can be all, submissions or reservations
   * @returns
   */
  getSubmissionsOfBatch = async (batchId: number, category = 'all'): Promise<Array<Task>> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
      table: 'submission',
      index_position: 3,
      key_type: 'i64',
      lower_bound: batchId,
      upper_bound: batchId,
      limit: this.config.batchSizeLimit
    }
    const data = await this.api.rpc.get_table_rows(config)
    if (data.more) {
      // TODO: this should not happen, limit is too high
      throw new Error('could not retrieve all submissions for batch')
    }

    const batchSubmissions = []
    for await (const sub of data.rows) {
      if (batchId === parseInt(sub.batch_id)) {
        if (category === 'all') {
          batchSubmissions.push(sub)
        } else if (category === 'reservations' && !sub.data ) {
          batchSubmissions.push(sub)
        } else if (category === 'submissions' && sub.data) {
          batchSubmissions.push(sub)
        }
      }
    }

    return batchSubmissions;
  }

  /**
   * Does this make sense? So it might makes sense to iterate through the array in reverse order. 
   * Get Last submission 
   * @returns Task
   */
     getLatestSubmissions = async (): Promise<GetTableRowsResult> => {
      const config = {
        code: this.config.forceContract,
        scope: this.config.forceContract,
        table: 'submission',
        key_type: 'i64',
        limit: 20,
        reverse: true
      }
  
      const task = await this.api.rpc.get_table_rows(config)
    
      return task
    }
  

  /**
   * Get individual task
   * @param leafHash - leafHash of task
   * @returns Task
   */
  getTask = async (leafHash: string): Promise<Task> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
      limit: 1,
      table: 'submission',
      index_position: 2,
      key_type: 'sha256',
      lower_bound: leafHash,
      upper_bound: leafHash
    }
    const data = await this.api.rpc.get_table_rows(config)

    return data[0];
  }

  /**
   * Get individual task result
   * @param leafHash - leafHash of task
   * @returns Task
   */
  getTaskResult = async (leafHash: string): Promise<Task> => {
    const task = await this.getTask(leafHash)
    let result: Task | PromiseLike<Task>
    if (task && task.data) {
      result = task
    }

    return result;
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
      const result = await this.getTaskResult(leafHash)
      if (result) {
        return taskResultFound(result)
      }
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
  getBatches = async (nextKey, limit:number = 20): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
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
      if (batch.tasks_done >= 0 && batch.num_tasks > 0 && batch.tasks_done < (batch.num_tasks * batch.repetitions)) {
        batch.status = 'Active'
      }
      else if (batch.tasks_done > 0 && batch.num_tasks === 0) {
        batch.status = 'Paused'
      }
      else if (batch.num_tasks === batch.tasks_done) {
        batch.status = 'Completed'
      } else {
        batch.status = 'Not Published'
      }
    });

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
        throw new Error('Max file size allowed is 10 MB')
      } else {
        const requestOptions: RequestInit = {
          method: 'POST',
          body: formData
        }
        const response = await this.fetch(`${this.config.ipfsNode}/api/v0/add?pin=true`, requestOptions)
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
    let sig: Signature
    let batchId: number = 0

    if ((content.tasks.length * repetitions) > this.config.batchSizeLimit) {
      throw new Error(`Batch size exceeds limit of ${this.config.batchSizeLimit} (including repetitions)`)
    }

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
      // mkbatch_params params = {8, id, campaign_id, content, task_merkle_root};
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
    const toAccountId = this.config.forceVaccountId
    const fromAccountId = this.effectAccount.vAccountRows[0].id
    const nonce = this.effectAccount.vAccountRows[0].nonce
    if (isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(1)
      serialbuff.pushUint32(nonce)
      serialbuff.pushArray(Numeric.decimalToBinary(8, fromAccountId.toString()))
      serialbuff.pushArray(Numeric.decimalToBinary(8, toAccountId.toString()))
      serialbuff.pushAsset(amount + ' ' + this.config.efxSymbol)
      serialbuff.pushName(this.config.efxTokenContract)

      vaccSig = await this.generateSignature(serialbuff)
    }

    let batchPk = getCompositeKey(batchId, campaignId)

    let pubSig: Signature;
    if (isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(17)
      serialbuff.pushNumberAsUint64(batchPk)

      pubSig = await this.generateSignature(serialbuff)
    }

    const authorization = [{
      actor: isBscAddress(campaignOwner) ? this.config.eosRelayerAccount : campaignOwner,
      permission: isBscAddress(campaignOwner) ? this.config.eosRelayerPermission : this.effectAccount.permission
    }]

    // console.log("batch composite key", batchPk)
    const actions = [{
      account: this.config.forceContract,
      name: 'mkbatch',
      authorization,
      data: {
        id: batchId,
        campaign_id: campaignId,
        content: { field_0: 0, field_1: hash },
        task_merkle_root: root,
        repetitions: repetitions,
        qualis: null,
        payer: isBscAddress(campaignOwner) ? this.config.eosRelayerAccount : campaignOwner,
        sig: isBscAddress(campaignOwner) ? sig.toString() : null
      },
    }, {
      account: this.config.accountContract,
      name: 'vtransfer',
      authorization,
      data: {
        from_id: fromAccountId,
        to_id: toAccountId,
        quantity: {
          quantity: amount + ' ' + this.config.efxSymbol,
          contract: this.config.efxTokenContract,
        },
        sig: isBscAddress(fromAccount) ? vaccSig.toString() : null,
        fee: null,
        memo: batchPk
      },
    }, {
      account: this.config.forceContract,
      name: 'publishbatch',
      authorization,
      data: {
        account_id: this.effectAccount.vAccountRows[0].id,
        batch_id: batchPk,
        num_tasks: content.tasks.length,
        sig: isBscAddress(fromAccount) ? pubSig.toString() : null,
      },
    }]
    const transaction = await this.sendTransaction(campaignOwner, actions);
    return {
      transaction,
      id: batchId,
      leaves

    }
  }

  /**
   * deletes a batch from a force Campaign.
   * @param campaignId existing campaign ID
   * @returns transaction result
   */
  deleteBatch = async (id: number, campaignId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
      account: this.config.forceContract,
      name: 'rmbatch',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        id: id,
        campaign_id: campaignId,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }

    return await this.sendTransaction(owner, action)
  }

  /**
   * pause batch which contains active tasks
   * @param id batch ID
   * @param campaignId campaign ID
   * @returns transaction
   */
  pauseBatch = async (batch: Batch) => {
    let sig: Signature
    const owner = this.effectAccount.accountName
    let vaccount = ['name', owner]
    const batchPK = getCompositeKey(batch.id, batch.campaign_id)
    // console.log(batch)
    // console.log(batch.id, batch.campaign_id, batchPK)
    if (isBscAddress(owner)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(16)
      serialbuff.pushNumberAsUint64(batchPK)
      vaccount = ['address', owner]
      sig = await this.generateSignature(serialbuff)
    }
    const reservations = await this.getSubmissionsOfBatch(batchPK, 'reservations')
    // console.log(reservations)
    if (reservations.length) {
      const action = {
        account: this.config.forceContract,
        name: 'closebatch',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
          permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          batch_id: batchPK,
          owner: vaccount,
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      }
      return await this.sendTransaction(owner, action)
    }
    else {
      throw new Error('No active tasks found for batch.')
    }
  }


  resumeBatch = async (batch: Batch) => {
    let sig: Signature
    const owner = this.effectAccount.accountName
    const batchPK = getCompositeKey(batch.id, batch.campaign_id)

    if (isBscAddress(owner)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(17)
      serialbuff.pushNumberAsUint64(batchPK)
      sig = await this.generateSignature(serialbuff)
    }
    const content = await this.getIpfsContent(batch.content.field_1)

    if (content.tasks.length > 0) {
      const action = {
        account: this.config.forceContract,
        name: 'publishbatch',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
          permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          batch_id: batchPK,
          num_tasks: content.tasks.length,
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      }
      return await this.sendTransaction(owner, action)
    }
    else {
      throw new Error('No active tasks found for batch.')
    }
  }

  /**
   * creates a force Campaign.
   * @param hash campaign data on IPFS
   * @param quantity the amount of tokens rewarded
   * @returns transaction result
   */
  createCampaign = async (hash: string, quantity: string, qualis?: Array<object>): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
      account: this.config.forceContract,
      name: 'mkcampaign',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        owner: [isBscAddress(owner) ? 'address' : 'name', owner],
        content: { field_0: 0, field_1: hash },
        reward: {
          quantity: convertToAsset(quantity) + ' ' + this.config.efxSymbol,
          contract: this.config.efxTokenContract
        },
        qualis: qualis ? qualis : [],
        payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }

    return await this.sendTransaction(owner, action)
  }

  /**
   * updates a force Campaign.
   * @param campaignId existing campaign ID
   * @param hash campaign data on IPFS
   * @param quantity the amount of tokens rewarded
   * @returns transaction result
   */
  editCampaign = async (campaignId: number, hash: string, quantity: string, qualis?: Array<object>): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
      account: this.config.forceContract,
      name: 'editcampaign',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        campaign_id: campaignId,
        owner: [isBscAddress(owner) ? 'address' : 'name', owner],
        content: { field_0: 0, field_1: hash },
        reward: {
          quantity: convertToAsset(quantity) + ' ' + this.config.efxSymbol,
          contract: this.config.efxTokenContract
        },
        qualis: qualis ? qualis : [],
        payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }

    return await this.sendTransaction(owner, action)
  }

    /**
   * deletes a force Campaign.
   * @param campaignId existing campaign ID
   * @returns transaction result
   */
    deleteCampaign = async (campaignId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
      let sig: Signature
      const owner = this.effectAccount.accountName

      if (isBscAddress(owner)) {
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(11)
        serialbuff.pushUint32(campaignId)

        sig = await this.generateSignature(serialbuff)
      }

      const action = {
        account: this.config.forceContract,
        name: 'rmcampaign',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
          permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          campaign_id: campaignId,
          owner: [isBscAddress(owner) ? 'address' : 'name', owner],
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      }

      return await this.sendTransaction(owner, action)
    }

  /**
   * Makes a campaign (uploadCampaign & createCampaign combined)
   * @param content
   * @param quantity
   * @returns
   */
  makeCampaign = async (content: object, quantity: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    // upload to ipfs
    const hash = await this.uploadCampaign(content)
    // create campaign
    return await this.createCampaign(hash, quantity)
  }

  reserveFreeTask = async (batch: Batch, tasks: Array<any>, submissions: Array<Task>): Promise<any> => {
    let taskIndex
    // First go through the submissions and get all the indexes of the tasks that are done
    const indexes = []
    const userIndexes = []
    const treeLeaves = await this.getTreeLeaves(batch.campaign_id, batch.id, tasks)
    for await (const sub of submissions) {
      const index = await this.getTaskIndexFromLeaf(batch.campaign_id, batch.id, sub.leaf_hash, tasks, treeLeaves)
      indexes.push(index)
      if (sub.account_id === this.effectAccount.vAccountRows[0].id) {
        userIndexes.push(index)
      }
    }

    if (indexes.length > 0) {
      // create object, which holds the count of the task indexes in the submissions
      const indexesCount = {}
      for (let i = 0; i < batch.num_tasks; i++) {
        indexesCount[i] = 0
      }
      for (const num of indexes) {
        indexesCount[num] = indexesCount[num] ? indexesCount[num] + 1 : 1
      }
      // grab the first available index, that the user hasn't done yet
      const availableIndex = Object.keys(indexesCount).find(key => indexesCount[key] < batch.repetitions && !this.didWorkerDoTask(userIndexes, key))
      taskIndex = availableIndex ? parseInt(availableIndex) : null
    } else {
      // no submissions yet in batch
      taskIndex = 0
    }

    // if the taskIndex is empty, it means that there are no available tasks anymore
    if (taskIndex === null) {
      throw new Error('no available tasks')
    }
    // console.log("make new reservation for task index", taskIndex)
    return this.reserveTask(batch.id, taskIndex, batch.campaign_id, tasks)
  }

  didWorkerDoTask = (userIndexes, key): Boolean => {
    const item = userIndexes.find(i => parseInt(i) === parseInt(key))
    return item !== null && item !== undefined
  }

  reserveOrClaimTask = async (batch: Batch, tasks: Array<any>): Promise<Task> => {
    const submissions = await this.getSubmissionsOfBatch(batch.batch_id)
    const reservations = submissions.filter(s => !s.data || !s.data.length)
    // get a reservation for the user
    // could be an active reservation of the user, or an expired/released reservation in the batch
    let reservation = null
    const accountId = this.effectAccount.vAccountRows[0].id
    for (const rv of reservations) {
      if (rv.account_id !== null && parseInt((new Date(new Date(rv.submitted_on) + 'UTC').getTime() / 1000).toString()) + parseInt(this.config.releaseTaskDelaySec.toFixed(0)) < parseInt((Date.now() / 1000).toFixed(0))) {
        // found expired reservation
        reservation = rv
        reservation.isExpired = true
        // console.log('found expired reservation')
      } else if (rv.account_id === null) {
        // found a released reservation
        // console.log('found released reservation')

        reservation = rv
        reservation.isReleased = true
      } else if (rv.account_id === accountId) {
        // console.log('found own reservation')

        // found own reservation
        reservation = rv
        break // stop searching when we find own reservation
      }
    }
    let tx
    if (reservation) {
      // There is a reservation available that is either from the user OR is expired/released
      if (reservation.isExpired) {
        // (re) claim expired task
        tx = await this.claimExpiredTask(reservation.id, reservation.account_id)
      } else if (reservation.isReleased) {
        // (re) claim released task
        tx = await this.reclaimTask(reservation.id)
      }
    } else {
      // console.log('make new reservation')

      // User doesn't have reservation yet, so let's make one!
      tx = await this.reserveFreeTask(batch, tasks, submissions)
    }
    if (tx) {
      await this.waitTransaction(tx);
      if (reservation) {
        // reclaiming successfull! only thing that should be changed is account_id
        reservation.account_id = accountId
      } else {
        // we didn't have a reservation before, so we made a new reservation. lets retrieve it
        const submissions = await this.getSubmissionsOfBatch(batch.batch_id)
        reservation = submissions.find(s => (!s.data || !s.data.length) && s.account_id === accountId)
      }
    }
    if (!reservation) {
      // Try it one more time before throwing an error
      await sleep(1000)
      const submissions = await this.getSubmissionsOfBatch(batch.batch_id)
      reservation = submissions.find(s => (!s.data || !s.data.length) && s.account_id === accountId)
      if (!reservation) {
        throw new Error('Could not find reservation')
      }
    }
    reservation.task_index = await this.getTaskIndexFromLeaf(batch.campaign_id, batch.id, reservation.leaf_hash, tasks)
    return reservation
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
      account: this.config.forceContract,
      name: 'reservetask',
      authorization: [{
        actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        proof: hexproof,
        position: pos,
        data: CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(tasks[taskIndex]))),
        campaign_id: campaignId,
        batch_id: batchId,
        account_id: accountId,
        payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        sig: isBscAddress(user) ? sig.toString() : null
      }
    }

    if (sendTransaction) {
      return await this.sendTransaction(user, action);
    } else {
      return action
    }
  }

  /**
   * release and reclaim expired task.
   * @param taskId
   */
  claimExpiredTask = async (taskId: number, account_id?: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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

    const actions = []
    // if the task is not realeased yet, release it first
    if (account_id) {
      // console.log('account id: ', account_id)
      actions.push({
        account: this.config.forceContract,
        name: 'releasetask',
        authorization: [{
          actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
          permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          task_id: taskId,
          account_id: accountId,
          payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
          sig: isBscAddress(user) ? releaseSig.toString() : null
        }
      })
    }
    actions.push({
      account: this.config.forceContract,
      name: 'reclaimtask',
      authorization: [{
        actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        task_id: taskId,
        account_id: accountId,
        payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        sig: isBscAddress(user) ? reclaimSig.toString() : null
      }
    })
    return await this.sendTransaction(user, actions);
  }

  /**
   * Release a task reservation.
   * @param taskId
   * @returns
   */
  releaseTask = async (taskId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
      account: this.config.forceContract,
      name: 'releasetask',
      authorization: [{
        actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        task_id: taskId,
        account_id: accountId,
        payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        sig: isBscAddress(user) ? sig.toString() : null
      }
    }]
    return await this.sendTransaction(user, action);
  }

  /**
   * Reclaim a released task reservation.
   * @param taskId
   * @returns
   */
  reclaimTask = async (taskId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
      account: this.config.forceContract,
      name: 'reclaimtask',
      authorization: [{
        actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        task_id: taskId,
        account_id: accountId,
        payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        sig: isBscAddress(user) ? sig.toString() : null
      }
    }]
    return await this.sendTransaction(user, action);
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
      account: this.config.forceContract,
      name: 'submittask',
      authorization: [{
        actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        task_id: submissionId,
        data: data,
        account_id: accountId,
        batch_id: batchId,
        payer: isBscAddress(user) ? this.config.eosRelayerAccount : user,
        sig: isBscAddress(user) ? sig.toString() : null
      }
    }
    return await this.sendTransaction(user, action);
  }

  /**
   * Receive tokens from completed tasks.
   * @param paymentId
   * @returns
   */
  payout = async (): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
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
        if (((new Date(new Date(payment.last_submission_time) + 'UTC').getTime() / 1000) + this.config.payoutDelaySec) < ((Date.now() / 1000))) {
          actions.push({
            account: this.config.forceContract,
            name: 'payout',
            authorization: [{
              actor: isBscAddress(user) ? this.config.eosRelayerAccount : user,
              permission: isBscAddress(user) ? this.config.eosRelayerPermission : this.effectAccount.permission
            }],
            data: {
              payment_id: payment.id,
              sig: isBscAddress(user) ? sig.toString() : null
            }
          })
        }
      }
    } else {
      throw new Error('No pending payouts found');
    }
    return await this.sendTransaction(user, actions);
  }
  /**
   * Get task index from merkle leaf
   * @param leafHash
   * @param tasks
   * @returns
   */
  getTaskIndexFromLeaf = async function (campaignId: number, batchId:number, leafHash: string, tasks: Array<Task>, leaves?: Array<String>): Promise<number> {
    let taskIndex: number;
    const treeLeaves = leaves ? leaves : await this.getTreeLeaves(campaignId, batchId, tasks)
    for (let i = 0; i < treeLeaves.length; i++) {
      if (treeLeaves[i].substring(2) === leafHash) {
        taskIndex = i
      }
    }
    return taskIndex
  }

  /**
   * Get the tree leaves
   * @param campaignId
   * @param batchId
   * @param tasks
   * @returns
   */
  getTreeLeaves = async function (campaignId: number, batchId:number, tasks: Array<Task>): Promise<Array<String>> {
    const prefixle = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.create([campaignId, batchId], 8))
    const prefixbe = CryptoJS.enc.Hex.parse(prefixle.match(/../g).reverse().join(''))
    const sha256 = (x: string) => Buffer.from(ecc.sha256(x), 'hex')

    const leaves = tasks.map(x => SHA256(prefixbe.clone().concat(CryptoJS.enc.Utf8.parse(JSON.stringify(x)))))
    const tree = new MerkleTree(leaves, sha256)
    const treeLeaves = tree.getHexLeaves()

    return treeLeaves
  }

  /**
   * Create a Qualification andassign it to a campaign
   */
  createQualification = async (name: string, description: string, type: number, image?: string, ishidden?: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    const qualification = { name, description, type, image, ishidden }

    let sig: Signature
    const owner = this.effectAccount.accountName
    const accountId = this.effectAccount.vAccountRows[0].id
    const hash = await this.uploadCampaign(qualification)
    // console.log('Upload succesful, hash: ', hash)


    if (isBscAddress(owner)) {
      // mkquali_params params = {18, account_id, content};
      // (.push 18)  (.pushUint32 acc-id) (.push 0) (.pushString content))))
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(18)
      serialbuff.pushUint32(accountId)
      serialbuff.push(0)
      serialbuff.pushString(hash)

      sig = await this.generateSignature(serialbuff)
      // console.log('Signature generated', sig)
    }

    const action = {
      account: this.config.forceContract,
      name: 'mkquali',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        content: { field_0: 0, field_1:  hash },
        account_id: accountId,
        payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }
    
    return await this.sendTransaction(owner, action)
  }

  /**
   * Edit a Qualification
   */
  editQualification = async (qualificationId: number, name: string, description: string, type: number, image?: string, ishidden?: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    const qualification = { name, description, type, image, ishidden }

    let sig: Signature
    const owner = this.effectAccount.accountName
    const accountId = this.effectAccount.vAccountRows[0].id
    const hash = await this.uploadCampaign(qualification)
    // console.log('Upload succesful, hash: ', hash)


    // Check if caller of this function is the owner of the qualification
    const qualiToEdit = await this.getQualification(qualificationId);
    if (qualiToEdit.account_id !== accountId) {
      throw new Error('Caller is not the owner of this qualification')
    }

    if (isBscAddress(owner)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(20)
      serialbuff.pushUint32(accountId)
      serialbuff.push(0)
      serialbuff.pushString(hash)

      sig = await this.generateSignature(serialbuff)
      // console.log('Signature generated', sig)
    }

    const action = {
      account: this.config.forceContract,
      name: 'editquali',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        quali_id: qualificationId,
        content: { field_0: 0, field_1:  hash },
        account_id: accountId,
        payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }

    return await this.sendTransaction(owner, action)
  }

  /**
   * Assign a qualification to a user.
   * @param qualificationId
   * @param user
   * @returns Transacation  
   */
  assignQualification = async (ids: Array<number> | number, accountId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    let qualificationIds = []
    if (!Array.isArray(ids)) {
      qualificationIds.push(ids)
    } else {
      qualificationIds = [...ids]
    }

    let sig: Signature
    const owner = this.effectAccount.accountName
    const actions = []

    for (let i = 0; i < qualificationIds.length; i++) {
      const qid = qualificationIds[i];

      if (isBscAddress(owner)) {
        //  rmbatch_params params = {19, quali_id, user_id};
        // (.push 19) (.pushUint32 id) (.pushUint32 user-id))))
        const serialbuff = new Serialize.SerialBuffer()
        serialbuff.push(19)
        serialbuff.pushUint32(qid)
        serialbuff.pushUint32(accountId)

        sig = await this.generateSignature(serialbuff)
      }

      actions.push({
        account: this.config.forceContract,
        name: 'assignquali',
        authorization: [{
          actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
          permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          quali_id: qid,
          user_id: accountId,
          payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
          sig: isBscAddress(owner) ? sig.toString() : null
        }
      })
    }

    return await this.sendTransaction(owner, actions)
  }

  /**
   * Remove a qualification from a user.
   * serialbuffer size: 20
   */
  unAssignQualification = async (id: number, accountId: number): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    let sig: Signature
    const owner = this.effectAccount.accountName

    if (isBscAddress(owner)) {
      //     (.push 20) (.pushUint32 id) (.pushUint32 user-id))))
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(20)
      serialbuff.pushUint32(id)
      serialbuff.pushUint32(accountId)

      sig = await this.generateSignature(serialbuff)
    }

    const action = {
      account: this.config.forceContract,
      name: 'uassignquali',
      authorization: [{
        actor: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        permission: isBscAddress(owner) ? this.config.eosRelayerPermission : this.effectAccount.permission
      }],
      data: {
        quali_id: id,
        user_id: accountId,
        payer: isBscAddress(owner) ? this.config.eosRelayerAccount : owner,
        sig: isBscAddress(owner) ? sig.toString() : null
      }
    }
    
    return await this.sendTransaction(owner, action)
  }

   /**
   * Get Qualification
   * @param id - id of campaign
   * @param processCampaign - get campaign content from ipfs
   * @returns Qualification
   */
  getQualification = async (id: number, processQualification: boolean = true): Promise<Qualification> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
      table: 'quali',
      key_type: 'i64',
      lower_bound: id,
      upper_bound: id,
    }

    let qualification = (await this.api.rpc.get_table_rows(config)).rows[0]
    if (processQualification) {
      // Get Quali Info.
      qualification = await this.processQualification(qualification)
    }

    return qualification
  }

  /**
   * Get User Qualifications
   * @param id - id xof the user
   * @returns Array<Qualification>
   */
  getAssignedQualifications = async (userId: number): Promise<any[]> => {
    const userIdHex = userId.toString(16) // potential hex implementation.
    const hex32 = ("00000000" + userIdHex).slice(-8)
    const lower = hex32.padEnd(16, '0')
    const upper = hex32.padEnd(16, 'F')

    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
      table: 'userquali',
      limit: 100, // temp fix until pagination
      lower_bound: parseInt(lower, 16),
      upper_bound: parseInt(upper, 16),
    }

    const qualifications = await this.api.rpc.get_table_rows(config)

    const userQualis = []
    for (let i = 0; i < qualifications.rows.length; i++) {
      const quali = await this.getQualification(qualifications.rows[i].quali_id)
      userQualis.push(quali)
    }

    return userQualis;
  }

  /**
   * Get Force Qualifications
   * @param nextKey - key to start searching from
   * @param limit - max number of rows to return
   * @param processCampaign - get qualification content from ipfs
   * @returns - Qualification Table Rows Result
  */
  getQualifications = async (nextKey, limit = 20, processQualifications: boolean = true): Promise<GetTableRowsResult> => {
    const config = {
      code: this.config.forceContract,
      scope: this.config.forceContract,
      table: 'quali',
      limit: limit,
      lower_bound: undefined
    }
    if (nextKey) {
      config.lower_bound = nextKey
    }

    const qualifications = await this.api.rpc.get_table_rows(config)

    if (processQualifications) {
      // Get Quali Info.
      for (let i = 0; i < qualifications.rows.length; i++) {
        qualifications.rows[i] = await this.processQualification(qualifications.rows[i])
      }
    }

    return qualifications;
  }

  /**
   * processQualification
   * @param qualification
   * @returns Promise<Qualification> - Qualification with content
   */
  processQualification = async (qualification: Qualification): Promise<Qualification> => {
    try {
      // field_0 represents the content type where:
      // 0: IPFS
      if (qualification.content.field_0 === 0 && qualification.content.field_1 !== '') {
        // field_1 represents the IPFS hash
        qualification.info = await this.getIpfsContent(qualification.content.field_1)
      }
    } catch (e) {
      qualification.info = null
      console.error('processCampaign', e)
    }
    return qualification
  }

}
