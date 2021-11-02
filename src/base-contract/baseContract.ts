import { Account } from './../account/account';
import { defaultConfiguration } from './../config/config';
import { EffectClientConfig } from './../types/effectClientConfig';
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { Api, Serialize, JsonRpc } from 'eosjs'
import RIPEMD160 from "eosjs/dist/ripemd"
import Web3 from 'web3';
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import { utils } from 'ethers';
import { EffectAccount } from '../types/effectAccount';
import { isBscAddress, nameToHex } from '..';
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

  /**
   * Constructor for the BaseContract class. 
   * @param api The EOSIO API
   * @param environment The environment to connect to. Default to testnet, which connects to kylin.
   * @param configuration The configuration object for the client.
   * @param web3 The web3 instance to use for BSC.
   */
  constructor(api: Api, environment:string, configuration?: EffectClientConfig, web3?: Web3) {
    this.api = api;
    this.web3 = configuration.web3 || web3;
    this.config = defaultConfiguration(environment, configuration);
  }

  isAccountIsConnected(): boolean {
    return this.effectAccount ? true : false
  }

    /**
  * Update vAccountRows, then use length of rows as nonce.
  * @returns {Promise<number>} Nonce to be used with each transaction
  */
  updateRetrieveNonce = async (): Promise<number> => {
      if(!this.isAccountIsConnected()) {
          throw new Error('No account connected.')
      } else {
        try {
          const account = this.effectAccount.accountName;
          let accString: string;
    
          if(isBscAddress(account)) {
            const address:string = account.length == 42 ? account.substring(2) : account;
            accString = (nameToHex(this.config.efx_token_account) + "00" + address).padEnd(64, "0");
          } else {
            accString = (nameToHex(this.config.efx_token_account) + "01" + nameToHex(account)).padEnd(64, "0");
          }
    
          const rows = (await this.api.rpc.get_table_rows({
              code: this.config.account_contract,
              scope: this.config.account_contract,
              index_position: 2,
              key_type: "sha256",
              lower_bound: accString,
              upper_bound: accString,
              table: 'account',
              json: true,
          })).rows;
  
          this.effectAccount.vAccountRows = rows;
  
          return rows.length
          
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
  setSignatureProvider = async (effectAccount: EffectAccount, web3?: Web3): Promise<void> => {
    if(web3) {
      this.web3 = web3;
    }
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
      sig = await this.web3.eth.sign('0x'+paramsHash, address)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }

    sig = utils.splitSignature(sig)
    // TODO: figure out how to get Signature in right format without this hack
    sig.r = new BN(sig.r.substring(2),16)
    sig.s = new BN(sig.s.substring(2), 16)
    sig = Signature.fromElliptic(sig, 0)

    return sig
  }

}
