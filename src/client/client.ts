import { Api, JsonRpc, RpcError } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch' // fetch for node.js environment 
import { Transaction } from "@dfuse/client"

/**
 * Options that can be passed to the client factory.
 */
export interface EffectClientOptions {

    /**
     * The network to connect to.
     */
    network: "mainnet" | "kylin" | string

    /**
     * EOS Signature Provider
     */
    signatureProvider: JsSignatureProvider

    /**
     * The host where the json-rpc will connect to.
     * @default "localhost"
     */
    host: string

    /**
     * The Effect API Key to interact with Effect-Network api service.
     * TODO: Update this url
     * You can obtain and manage your keys at: https://api.effect.network
     */
    apiKey?: string

    /**
     * Protocol to use for the connection.
     */
    secure?: boolean

    /**
     * Specifies the need for authentication of the call. 
     * If the call is made to a public endpoint this can be set to false.
     */
    authentication?: boolean

    /**
     * Authentication url
     * @default https://auth.effect.network
     */
    authUrl?: string
}

export class EffectClient {
    api: Api;

    constructor(options: EffectClientOptions) {
        const { apiKey, network, signatureProvider, host, secure, authentication, authUrl } = options
        const rpc = new JsonRpc(host, {fetch})
        this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
    }

    // TODO: make get balance
    getBalance = async (account: string): Promise<any> => {
      // TODO: env config
      try {
        const resp = await this.api.rpc.get_currency_balance('eosio.token', account, 'EOS')
        return resp[0]
      } catch (err) {
        throw new Error(err)
      }
    }

    openAccount = async (account: string): Promise<any> => {
      try {
        const result = await this.api.transact({
          actions: [{
            account: process.env.ACCOUNT_CONTRACT,
            name: 'open',
            authorization: [{
              actor: process.env.EOS_FEE_PAYER,
              permission: 'active',
            }],
            data: {
              // TODO: check if checksum or name, assume name for now
              acc: ["name", account],
              symbol: {contract: process.env.EFX_TOKEN_ACCOUNT, sym: process.env.EFX_EXTENDED_SYMBOL},
              payer: process.env.EOS_FEE_PAYER,
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

    // TODO: finish this when get balance is done
    deposit = async (fromAccount: string, amount: string, memo: string): Promise<any> => {
      try {
        const result = await this.api.transact({
          actions: [{
            account: process.env.EFX_TOKEN_ACCOUNT,
            name: 'transfer',
            authorization: [{
              actor: process.env.EOS_FEE_PAYER,
              permission: 'active',
            }],
            data: {
              from: process.env.EOS_FEE_PAYER,
              to: process.env.ACCOUNT_CONTRACT,
              quantity: amount,
              // TODO: memo = account balance index
              memo: "0",
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
}