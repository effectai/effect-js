import { Api, Serialize, Numeric } from 'eosjs'
import RIPEMD160 from "eosjs/dist/ripemd"
import Web3 from 'web3';
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
import { utils } from 'ethers';
const BN = require('bn.js');

// (def ec (new ec "secp256k1"))
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export class Account {
  api: Api;
  config: any;
  web3: Web3;
  pub: string;

  constructor(api: Api, web3?: Web3) {
    this.api = api;
    this.web3 = web3;

    // TODO: replace this with proper config
    this.config = {
      EFX_TOKEN_ACCOUNT:"tokenonkylin",
      EFX_SYMBOL:"UTL",
      EFX_EXTENDED_SYMBOL:"4,UTL",
      EOS_RELAYER:"testjairtest",
      EOS_RELAYER_PERMISSION:"active",
      ACCOUNT_CONTRACT:"acckylin1111"
    }
  }

  /**
   * Get the balance from a vaccount
   * @param account - name of the account or bsc
   * @returns - balance object of
   */
  getBalance = async (account: string): Promise<Array<object>> => {
    try {
      let accString;

      if(this.isBscAddress(account)) {
        const address:string = account.length == 42 ? account.substring(2) : account;
        accString = (this.nameToHex(this.config.EFX_TOKEN_ACCOUNT) + "00" + address).padEnd(64, "0");
      } else {
        accString = (this.nameToHex(this.config.EFX_TOKEN_ACCOUNT) + "01" + this.nameToHex(account)).padEnd(64, "0");
      }

      const resp = await this.api.rpc.get_table_rows({
          code: this.config.ACCOUNT_CONTRACT,
          scope: this.config.ACCOUNT_CONTRACT,
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
   * Open a vaccount
   * @param account - name or address of the account to open, for BSC addresses without 0x
   * @returns
   */
  openAccount = async (account: string, permission: string): Promise<object> => {
    try {
      let type = 'name'
      let address: string
      if(this.isBscAddress(account)) {
        type = 'address'
        address = account.length == 42 ? account.substring(2) : account;
      }

      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'open',
          authorization: [{
            actor: type == 'address' ? this.config.EOS_RELAYER : account,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {
            acc: [type, type == 'address' ? address : account],
            symbol: {contract: this.config.EFX_TOKEN_ACCOUNT, sym: this.config.EFX_EXTENDED_SYMBOL},
            payer: type == 'address' ? this.config.EOS_RELAYER : account,
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
  deposit = async (fromAccount: string, accountId: number, amount: string, permission: string): Promise<object> => {
    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.EFX_TOKEN_ACCOUNT,
          name: 'transfer',
          authorization: [{
            actor: fromAccount,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {
            from: fromAccount,
            to: this.config.ACCOUNT_CONTRACT,
            quantity: amount + ' ' + this.config.EFX_SYMBOL,
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
  withdraw = async (fromAccount: string, accountId: number, nonce: number, toAccount: string, amount: string, permission: string, memo?: string): Promise<any> => {
    let sig;
    if(this.isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(2)
      serialbuff.pushUint32(nonce)
      serialbuff.pushArray(Numeric.decimalToBinary(8, accountId.toString()))
      serialbuff.pushName(toAccount)
      serialbuff.pushAsset(amount + ' ' + this.config.EFX_SYMBOL)
      serialbuff.pushName(this.config.EFX_TOKEN_ACCOUNT)

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
          account: this.config.ACCOUNT_CONTRACT,
          name: 'withdraw',
          authorization: [{
            actor: this.isBscAddress(fromAccount) ? this.config.EOS_RELAYER : fromAccount,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {
            from_id: accountId,
            to_account: toAccount,
            quantity: {
              quantity: amount + ' ' + this.config.EFX_SYMBOL,
              contract: this.config.EFX_TOKEN_ACCOUNT
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
  vtransfer = async (fromAccount: string, fromAccountId: number, toAccount: string, amount: string, permission: string): Promise<object> => {
    const balanceTo: object = await this.getBalance(toAccount)
    const balanceIndexTo: number = balanceTo[0].id
    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'vtransfer',
          authorization: [{
            actor: this.isBscAddress(fromAccount) ? this.config.EOS_RELAYER : fromAccount,
            permission: permission ? permission : this.config.EOS_RELAYER_PERMISSION,
          }],
          data: {
            from_id: fromAccountId,
            to_id: balanceIndexTo,
            quantity: {
              quantity: amount + ' ' + this.config.EFX_SYMBOL,
              contract: this.config.EFX_TOKEN_ACCOUNT
            },
            sig: null,
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
   * Convert account name to hex
   */
  nameToHex = (account: string): string => {
    const serialbuff = new Serialize.SerialBuffer();
    serialbuff.pushName(account);
    const bytes = serialbuff.asUint8Array();
    return Serialize.arrayToHex(bytes);
  }

  /**
   * Check if account is bsc address
   * @param account 
   */
  isBscAddress = (account: string): boolean => {
    return (account.length == 42 || account.length == 40)
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
