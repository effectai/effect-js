import { defaultConfiguration } from './../types/effectClientConfig';
import { Api, JsonRpc, RpcError, Serialize } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { Account } from '../account/account'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
// import fetch from 'node-fetch' // fetch for node.js environment

export class EffectClient {
    api: Api;
    account: Account;
    force: Force;
    config: EffectClientConfig;

    constructor(environment: string = 'testnet', configuration?: EffectClientConfig) {
        this.config = defaultConfiguration(environment, configuration)
        // TODO clean up these variables?
        const { web3, signatureProvider, host } = this.config
        const rpc = new JsonRpc(host, {fetch})

        // if it's web3 instance (bsc account) use the relayer as signatureProvider
        this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})

        this.account = new Account(this.api, environment, configuration, web3)
        this.force = new Force(this.api, environment, configuration, web3)
    }
    // TODO: move to generic helper file/class
    /**
     * Get IPFS Content in JSON
     * @param hash - hash of the IPFS content you want to fetch
     * @param format - format of the content you are fetching.
     * @returns content of the ipfs hash in your preferred format
     */
    getIpfsContent = async (hash: string, format: string = 'json'): Promise<any> => {
        const data = await fetch(`${this.config.ipfs_node}/ipfs/${hash}`)
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
