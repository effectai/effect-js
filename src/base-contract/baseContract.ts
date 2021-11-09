import { Account } from './../account/account';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize } from 'eosjs'
import RIPEMD160 from "eosjs/dist/ripemd"
import Web3 from 'web3';
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import { utils } from 'ethers';
import { EffectAccount } from '../types/effectAccount';
const BN = require('bn.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

/**
 * > “Elinor agreed to it all, for she did not think he deserved the compliment of rational opposition.” ― Jane Austen
 * 
 * The BaseContract class is the base class for Accounts and Force classes. 
 * It's main functionality is to handle the signatures and the connection to the network.
 */
export class BaseContract {
  api: Api;
  web3: Web3;
  config: EffectClientConfig;
  effectAccount: EffectAccount;
  fetch: any;
  blob: any;
  formData: any;

  /**
   * Constructor for the BaseContract class. 
   * @param api The EOSIO API
   * @param configuration The configuration object for the client.
   * @param environment The environment to connect to, either 'node' or 'browser'
   */
  constructor(api: Api, configuration: EffectClientConfig, environment: string = 'node') {
    this.api = api;
    this.config = configuration;
    this.web3 = this.config.web3;
    if (environment === 'node'){
      import('@web-std/fetch').then(module => this.fetch = module.default)
      import('@web-std/blob').then(module => this.blob = module.Blob)
      import('@web-std/form-data').then(module => this.formData =  module.FormData)
    } else {
        this.fetch = fetch
        this.blob = Blob
        this.formData = FormData
    }
  }

  isAccountIsConnected(): boolean {
    return this.effectAccount ? true : false
  }

  /**
  * Update vAccountRows, then use length of rows as nonce.
  * @returns {Promise<number>} Nonce to be used with each transaction
  */
  updatevAccountRows = async (): Promise<EffectAccount> => {
    if (!this.isAccountIsConnected()) {
      console.log(`🖐🏽🖐🏽🖐🏽\nBaseContract::this.EffectAccount\n${this.effectAccount}`)
      throw new Error('No account connected.')
    } else {
      try {
        const account = this.effectAccount.accountName;
        this.effectAccount.vAccountRows = Account.getVAccountByName(account)
        return this.effectAccount
      } catch (err) {
        throw new Error(err)
      }
    }
  }

  /**
   * 
   * @param rpc 
   * @param signatureProvider 
   * @param web3 
   * @returns 
   */
  setSignatureProvider = async (effectAccount: EffectAccount, api: Api, web3?: Web3): Promise<void> => {
    if (web3) {
      this.web3 = web3;
    }
    this.api = api
    this.effectAccount = effectAccount
  }

  /**
   * Recover BSC public key from signed message
   * @param message
   * @param signature
   * @returns
   */
  recoverPublicKey = async (message: string, signature: string): Promise<object> => {
    // recover public key
    const hashedMsg = utils.hashMessage(message)
    const pk = utils.recoverPublicKey(utils.arrayify(hashedMsg), signature.trim())
    const address = utils.computeAddress(utils.arrayify(pk))

    // compress public key
    const keypair = ec.keyFromPublic(pk.substring(2), 'hex')
    const compressed = keypair.getPublic().encodeCompressed('hex')

    // RIPEMD160 hash public key
    const ripemd16 = RIPEMD160.RIPEMD160.hash(Serialize.hexToUint8Array(compressed))
    const accountAddress = Serialize.arrayToHex(new Uint8Array(ripemd16)).toLowerCase()
    return { address, accountAddress }
  }

  /**
   * Generate Signature
   * @param serialbuff
   * @param address
   * @returns 
   */
  generateSignature = async (serialbuff: Serialize.SerialBuffer, address: string): Promise<Signature> => {
    let sig
    const bytes = serialbuff.asUint8Array()

    let paramsHash = ec.hash().update(bytes).digest()
    paramsHash = Serialize.arrayToHex(paramsHash)

    try {
      sig = await this.web3.eth.sign('0x' + paramsHash, address)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }

    sig = utils.splitSignature(sig)
    // TODO: figure out how to get Signature in right format without this hack
    sig.r = new BN(sig.r.substring(2), 16)
    sig.s = new BN(sig.s.substring(2), 16)
    sig = Signature.fromElliptic(sig, 0)

    return sig
  }

}
