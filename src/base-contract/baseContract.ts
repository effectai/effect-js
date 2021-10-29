import { defaultConfiguration } from './../config/config';
import { EffectClientConfig } from './../types/effectClientConfig';
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { Api, Serialize, JsonRpc } from 'eosjs'
import RIPEMD160 from "eosjs/dist/ripemd"
import Web3 from 'web3';
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import { utils } from 'ethers';
const BN = require('bn.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class BaseContract {
  api: Api;
  web3: Web3;
  config: EffectClientConfig;
  // TODO: create interface/type for effectAccount
  effectAccount: object;

  constructor(api: Api, environment:string, configuration?: EffectClientConfig, web3?: Web3) {
    this.api = api;
    this.web3 = configuration.web3 || web3;
    this.config = defaultConfiguration(environment, configuration);
  }

  /**
   * 
   * @param rpc 
   * @param signatureProvider 
   * @param web3 
   * @returns 
   */
  setSignatureProvider = async (effectAccount: object, rpc: JsonRpc, signatureProvider: SignatureProvider, web3?: Web3): Promise<Boolean> => {
    if(web3) {
      this.web3 = web3;
    }
    this.effectAccount = effectAccount
    this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})    
    return true
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
