import { BaseContract } from '../base-contract/baseContract';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize, Numeric, JsonRpc } from 'eosjs'
import RIPEMD160 from "eosjs/dist/ripemd"
import Web3 from 'web3';
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import { utils } from 'ethers';
import { isBscAddress } from '../utils/bscAddress'
import { convertToAsset } from '../utils/asset'
import { nameToHex } from '../utils/hex'
import fetch from 'cross-fetch';
import { EffectAccount } from '../types/effectAccount';
const BN = require('bn.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class Account extends BaseContract {
  pub: string;
  
  constructor(api: Api, environment:string, configuration?: EffectClientConfig, web3?: Web3) {
    super(api, environment, configuration, web3)
  }

  /**
   * Get a vaccount
   * @param account - name of the account or bsc
   * @returns - object of the given account name
   */
  getVAccountByName = async (account: string): Promise<Array<EffectAccount>> => {
    try {
      let accString;

      if(isBscAddress(account)) {
        const address:string = account.length == 42 ? account.substring(2) : account;
        accString = (nameToHex(this.config.efx_token_account) + "00" + address).padEnd(64, "0");
      } else {
        accString = (nameToHex(this.config.efx_token_account) + "01" + nameToHex(account)).padEnd(64, "0");
      }

      const resp = await this.api.rpc.get_table_rows({
          code: this.config.account_contract,
          scope: this.config.account_contract,
          index_position: 2,
          key_type: "sha256",
          lower_bound: accString,
          upper_bound: accString,
          table: 'account',
          json: true,
      }).then((data) => {
        return data.rows;
      });

      return resp;
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Get a vaccount
   * @param id - id of the account
   * @returns - object of the given account id
   */
  getVAccountById = async (id: number): Promise<Array<EffectAccount>> => {
    try {
      const resp = await this.api.rpc.get_table_rows({
        code: this.config.account_contract,
        scope: this.config.account_contract,
        index_position: 1,
        key_type: "sha256",
        lower_bound: id,
        upper_bound: id,
        table: 'account',
        json: true,
      }).then((data) => {
        return data.rows;
      });

      return resp;
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Open a vaccount
   * @param account - name or address of the account to open, for BSC addresses without 0x
   * @returns
   */
  openAccount = async (account: string, permission: string): Promise<object> => {
    try {
      let type = 'name'
      let address: string
      if(isBscAddress(account)) {
        type = 'address'
        address = account.length == 42 ? account.substring(2) : account;
      }

      const result = await this.api.transact({
        actions: [{
          account: this.config.account_contract,
          name: 'open',
          authorization: [{
            actor: type == 'address' ? this.config.eos_relayer : account,
            permission: permission ? permission : this.config.eos_relayer_permission,
          }],
          data: {
            acc: [type, type == 'address' ? address : account],
            symbol: {contract: this.config.efx_token_account, sym: this.config.efx_extended_symbol},
            payer: type == 'address' ? this.config.eos_relayer : account,
          },
        }]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      });
      // TODO: send/sign seperate
      return result;
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Deposit from account to vaccount
   * @param fromAccount - account to deposit from
   * @param toAccount - account to deposit to
   * @param amount - amount, example: '10.0000'
   * @returns
   */
  deposit = async (fromAccount: string, accountId: number, amountEfx: string, permission: string): Promise<object> => {
    try {
      const amount = convertToAsset(amountEfx)
      const result = await this.api.transact({
        actions: [{
          account: this.config.efx_token_account,
          name: 'transfer',
          authorization: [{
            actor: fromAccount,
            permission: permission ? permission : this.config.eos_relayer_permission,
          }],
          data: {
            from: fromAccount,
            to: this.config.account_contract,
            quantity: amount + ' ' + this.config.efx_symbol,
            memo: accountId,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      return result;
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Withdraw from vaccount to account
   * @param fromAccount - vaccount to withdraw from
   * @param toAccount - account to withdraw to
   * @param amount - amount, example: '10.0000'
   * @param memo - optional memo
   * @returns
   */
  withdraw = async (fromAccount: string, accountId: number, nonce: number, toAccount: string, amountEfx: string, permission: string, memo?: string): Promise<any> => {
    let sig;
    const amount = convertToAsset(amountEfx)
    if(isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(2)
      serialbuff.pushUint32(nonce)
      serialbuff.pushArray(Numeric.decimalToBinary(8, accountId.toString()))
      serialbuff.pushName(toAccount)
      serialbuff.pushAsset(amount + ' ' + this.config.efx_symbol)
      serialbuff.pushName(this.config.efx_token_account)

      const bytes = serialbuff.asUint8Array()

      let paramsHash = ec.hash().update(bytes).digest()
      paramsHash = Serialize.arrayToHex(paramsHash)

      // For test purposes (sometimes different than MetaMask signature?)
      // const keypair = ec.keyFromPrivate('cae6024c1d21c0a9442b85fc411b2c9aea43884c777310ac2d57d8f0621f99c2')
      // const sigg = keypair.sign(paramsHash)
      // console.log('sig priv', sigg)
      // console.log('eos format sig with priv', Signature.fromElliptic(sigg, 0).toString())

      try {
        sig = await this.web3.eth.sign('0x'+paramsHash, fromAccount)
      } catch (error) {
        console.error(error)
        return Promise.reject(error)
      }

      sig = utils.splitSignature(sig)
      // TODO: figure out how to get Signature in right format without this hack
      sig.r = new BN(sig.r.substring(2),16)
      sig.s = new BN(sig.s.substring(2), 16)
      sig = Signature.fromElliptic(sig, 0)
    }
    // TODO: BSC -> BSC transactie met memo via pnetwork
    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.account_contract,
          name: 'withdraw',
          authorization: [{
            actor: isBscAddress(fromAccount) ? this.config.eos_relayer : fromAccount,
            permission: permission ? permission : this.config.eos_relayer_permission,
          }],
          data: {
            from_id: accountId,
            to_account: toAccount,
            quantity: {
              quantity: amount + ' ' + this.config.efx_symbol,
              contract: this.config.efx_token_account
            },
            memo: memo,
            sig: sig ? sig.toString() : null,
            fee: null
          },
        }]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      });
      return result;
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Transfer between vaccounts
   * @param fromAccount - vaccount to transfer from
   * @param toAccount - vaccount to transfer to
   * @param amount - amount, example: '10.0000'
   * @returns
   */
  vtransfer = async (fromAccount: string, fromAccountId: number, nonce:number, toAccount: string, toAccountId:number, amountEfx: string, options: object): Promise<object> => {
    const balanceTo: object = await this.getVAccountByName(toAccount)
    const balanceIndexTo: number = balanceTo[0].id
    const amount = convertToAsset(amountEfx)

    let sig;
    if(isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(1)
      serialbuff.pushUint32(nonce)
      serialbuff.pushArray(Numeric.decimalToBinary(8, fromAccountId.toString()))
      serialbuff.pushArray(Numeric.decimalToBinary(8, toAccountId.toString()))
      serialbuff.pushAsset(amount + ' ' + this.config.efx_symbol)
      serialbuff.pushName(this.config.efx_token_account)

      sig = await this.generateSignature(serialbuff, options['address'])
    }

    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.account_contract,
          name: 'vtransfer',
          authorization: [{
            actor: isBscAddress(fromAccount) ? this.config.eos_relayer : fromAccount,
            permission: options['permission'] ? options['permission'] : this.config.eos_relayer_permission,
          }],
          data: {
            from_id: fromAccountId,
            to_id: balanceIndexTo,
            quantity: {
              quantity: amount + ' ' + this.config.efx_symbol,
              contract: this.config.efx_token_account
            },
            sig: isBscAddress(fromAccount) ? sig.toString() : null,
            fee: null
          },
        }]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      });
      return result;
    } catch (err) {
      throw new Error(err)
    }
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

}
