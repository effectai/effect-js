import { Api, JsonRpc, RpcError, Serialize } from 'eosjs'
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch' // fetch for node.js environment 
import { Account } from '../account/account'
import Web3 from 'web3'

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
    signatureProvider: JsSignatureProvider | SignatureProvider

    /**
     * The host where the json-rpc will connect to.
     * @default "localhost"
     */
    host: string

    /**
     * Web3 instance for BSC
     */
     web3?: Web3

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
    account: Account;

    constructor(options: EffectClientOptions) {
        const { apiKey, network, web3, signatureProvider, host, secure, authentication, authUrl } = options
        const rpc = new JsonRpc(host, {fetch})

        // if it's web3 instance (bsc account) use the relayer as signatureProvider
        if (web3) {
            // TODO: add config with relayer key
            const relayer = new JsSignatureProvider(['PRIVATE KEY'])
            this.api = new Api({rpc, signatureProvider: relayer, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
        } else {
            this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
        }

        this.account = new Account(this.api, web3)
    }
}