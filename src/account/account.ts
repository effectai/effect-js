import { BaseContract } from '../base-contract/baseContract';
import { EffectClientConfig } from './../types/effectClientConfig';
import { Api, Serialize, Numeric } from 'eosjs'
import { isBscAddress } from '../utils/bscAddress'
import { convertToAsset } from '../utils/asset'
import { vAccountRow } from '../types/vAccountRow';
import { TransactResult } from 'eosjs/dist/eosjs-api-interfaces';
import { ReadOnlyTransactResult, PushTransactionArgs } from 'eosjs/dist/eosjs-rpc-interfaces';
import { Signature } from 'eosjs/dist/Signature';

/**
 * > “And he read Principles of Accounting all morning, but just to make it interesting, he put lots of dragons in it.” ― Terry Pratchett, Wintersmith
 *
 * This class is used to interact with the virtual account system of Effect Network.
 * The virtual account system is a system that allows you to create virtual accounts on the blockchain.
 * This allows users to login with both their EOS and BSC addresses.
 * Then have one unififying interface from which transactions can be signed from the wallet of the user.
 *
 */
export class Account extends BaseContract {
  pub: string;

  /**
  * @constructor Creates a new instance of Account
  * @param api The EOS api instance that is used to send transactions to EOS blockchain
  * @param environment The environment that is used to connect to mainnet or testnet blockchain, default is `testnet` which connects to `kylin`
  * @param configuration The configuration that is used to connect to Effect Network
  * @param web3 The web3 instance that is used to interact with BSC blockchain
  */
  constructor(api: Api, configuration: EffectClientConfig) {
    super(api, configuration)
  }

  /**
   * Get a vaccount
   * @param id - id of the account
   * @returns - object of the given account id
   */
  getVAccountById = async (id: number): Promise<Array<vAccountRow>> => {
    try {
      return (await this.api.rpc.get_table_rows({
        code: this.config.accountContract,
        scope: this.config.accountContract,
        index_position: 1,
        key_type: "sha256",
        lower_bound: id,
        upper_bound: id,
        table: 'account',
        json: true,
      })).rows

    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Open a vaccount
   * @param account - name or address of the account to open, for BSC addresses without 0x
   * @returns
   */
  // TODO: optional parameter signatureProvider, use relayer
  openAccount = async (account: string, permission?: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      let type = 'name'
      let address: string
      if (isBscAddress(account)) {
        type = 'address'
        address = account.length == 42 ? account.substring(2) : account;
      }

      const action = {
        account: this.config.accountContract,
        name: 'open',
        authorization: [{
          actor: type == 'address' ? this.config.eosRelayerAccount : account,
          permission: isBscAddress(account) ? this.config.eosRelayerPermission : permission
        }],
        data: {
          acc: [type, type == 'address' ? address : account],
          symbol: { contract: this.config.efxTokenContract, sym: this.config.efxExtendedSymbol },
          payer: type == 'address' ? this.config.eosRelayerAccount : account,
        }
      }
      return this.sendTransaction(account, action);
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Deposit from account to vaccount
   * @param amountEfx amount of tokens
   * @returns transaction result
   */
  deposit = async (amountEfx: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    try {
      const fromAccount = this.effectAccount.accountName;
      const accountId = this.effectAccount.vAccountRows[0].id

      const amount = convertToAsset(amountEfx)
      await this.updatevAccountRows()
      return await this.api.transact({
        actions: [{
          account: this.config.efxTokenContract,
          name: 'transfer',
          authorization: [{
            actor: fromAccount,
            permission: isBscAddress(fromAccount) ? this.config.eosRelayerPermission : this.effectAccount.permission
          }],
          data: {
            from: fromAccount,
            to: this.config.accountContract,
            quantity: amount + ' ' + this.config.efxSymbol,
            memo: accountId,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: this.config.eosTxExpire,
      });
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Withdraw from vaccount to account
   * @param toAccount account to withdraw to
   * @param amountEfx amount of tokens
   * @param memo optional memo
   * @returns transaction result
   */
  withdraw = async (toAccount: string, amountEfx: string, memo?: string): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    let sig: Signature;

    await this.updatevAccountRows()
    const amount = convertToAsset(amountEfx)
    const fromAccount = this.effectAccount.accountName;
    const accountId = this.effectAccount.vAccountRows[0].id
    const nonce = this.effectAccount.vAccountRows[0].nonce

    if (isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer()
      serialbuff.push(2)
      serialbuff.pushUint32(nonce)
      serialbuff.pushArray(Numeric.decimalToBinary(8, accountId.toString()))
      serialbuff.pushName(toAccount)
      serialbuff.pushAsset(amount + ' ' + this.config.efxSymbol)
      serialbuff.pushName(this.config.efxTokenContract)

      sig = await this.generateSignature(serialbuff)
    }
    // TODO: BSC -> BSC transactie met memo via pnetwork
    try {
      const action = {
        account: this.config.accountContract,
        name: 'withdraw',
        authorization: [{
          actor: isBscAddress(fromAccount) ? this.config.eosRelayerAccount : fromAccount,
          permission: isBscAddress(fromAccount) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          from_id: accountId,
          to_account: toAccount,
          quantity: {
            quantity: amount + ' ' + this.config.efxSymbol,
            contract: this.config.efxTokenContract
          },
          memo: memo,
          sig: isBscAddress(fromAccount) ? sig.toString() : null,
          fee: null
        },
      }
      return this.sendTransaction(fromAccount, action)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Transfer between vaccounts
   * @param toAccountId vaccount to transfer to
   * @param amountEfx amount of tokens, example: '10.0000'
   * @param memo optional memo
   * @returns transaction result
   */
  vtransfer = async (toAccountId: number, amountEfx: string, memo: string = ""): Promise<ReadOnlyTransactResult | TransactResult | PushTransactionArgs> => {
    let sig: Signature;

    await this.updatevAccountRows()
    const amount = convertToAsset(amountEfx)
    const fromAccount = this.effectAccount.accountName;
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

      sig = await this.generateSignature(serialbuff)
    }

    try {
      const action = {
        account: this.config.accountContract,
        name: 'vtransfer',
        authorization: [{
          actor: isBscAddress(fromAccount) ? this.config.eosRelayerAccount : fromAccount,
          permission: isBscAddress(fromAccount) ? this.config.eosRelayerPermission : this.effectAccount.permission
        }],
        data: {
          from_id: fromAccountId,
          to_id: toAccountId,
          quantity: {
            quantity: amount + ' ' + this.config.efxSymbol,
            contract: this.config.efxTokenContract
          },
          memo: memo,
          sig: isBscAddress(fromAccount) ? sig.toString() : null,
          fee: null
        },
      }

      return this.sendTransaction(fromAccount, action)
    } catch (err) {
      throw new Error(err)
    }
  }
}
