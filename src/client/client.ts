import { Api, JsonRpc, RpcError } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch' // fetch for node.js environment 
import * as dotenv from "dotenv";
import { Transaction } from "@dfuse/client"

import process from "process";

dotenv.config();

/**
 * Options that can be passed to the client factory.
 */
export interface EffectClientOptions {

    /**
     * The network to connect to.
     */
    network: "mainnet" | "kylin" | string

    /**
     * Private key of the account to use for the client.
     */
    privateKey: string

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
        const { apiKey, network, privateKey, host, secure, authentication, authUrl } = options
        const signatureProvider = new JsSignatureProvider([privateKey])
        const rpc = new JsonRpc(host, {fetch})
        this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
    }

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
      console.log('openAccount', account)
      // TODO: env config
      try {
        const result = await this.api.transact({
          actions: [{
            account: 'acckylin1111',
            name: 'open',
            authorization: [{
              actor: 'testjairtest',
              permission: 'active',
            }],
            data: {
              // TODO: check if checksum or name
              acc: ["name", account],
              symbol: {contract: "tokenonkylin", sym: "4,UTL"},
              payer: 'testjairtest',
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
}