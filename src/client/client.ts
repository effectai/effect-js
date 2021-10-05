import { Api, JsonRpc, RpcError, Serialize } from 'eosjs'
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
// import fetch from 'node-fetch' // fetch for node.js environment
import { Account } from '../account/account'
import { Force } from '../force/force'
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
    force: Force;
    config: {[k: string]: any};

    constructor(options: EffectClientOptions) {
        const { apiKey, network, web3, signatureProvider, host, secure, authentication, authUrl } = options
        const rpc = new JsonRpc(host, {fetch})

        // TODO: replace this with proper config
        this.config = {
            IPFS_NODE: 'https://ipfs.effect.ai'
        }

        // if it's web3 instance (bsc account) use the relayer as signatureProvider
        if (web3) {
            // TODO: add config with relayer key
            const relayer = new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr'])
            this.api = new Api({rpc, signatureProvider: relayer, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
        } else {
            this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
        }

        this.account = new Account(this.api, web3)
        this.force = new Force(this.api, web3)
    }
    // TODO: move to generic helper file/class
    /**
     * Get IPFS Content in JSON
     * @param hash - hash of the IPFS content you want to fetch
     * @param format - format of the content you are fetching.
     * @returns content of the ipfs hash in your preferred format
     */
    getIpfsContent = async (hash: string, format: string = 'json'): Promise<any> => {
        const data = await fetch(this.config.IPFS_NODE + '/ipfs/' + hash)
        switch (format.toLowerCase()) {
            case 'formdata':
            case 'form':
                return data.text()
            case 'buffer':
            case 'arraybuffer':
            case 'array':
                return data.arrayBuffer()
            case 'blob':
                return data.blob()
            case 'text':
                return data.text()
            case 'json':
                return data.json()
        }
        return data
    }
}