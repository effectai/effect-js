import { defaultConfiguration } from './../config/config';
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { Api, JsonRpc } from 'eosjs'
import { Account } from '../account/account'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
import Web3 from 'web3';
import fetch from 'cross-fetch';

export class EffectClient {
    api: Api;
    account: Account;
    // TODO: make interface for this?
    effectAccount: object;
    force: Force;
    config: EffectClientConfig;
    environment: string;
    rpc: JsonRpc;

    constructor(environment: string = 'testnet', configuration?: EffectClientConfig) {
        // TODO: set relayer
        this.environment = environment;
        this.config = defaultConfiguration(environment, configuration)
        const { web3, signatureProvider, host } = this.config

        this.rpc = new JsonRpc(host, {fetch})

        this.api = new Api({rpc: this.rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})

        this.account = new Account(this.api, this.environment, configuration, web3)
        this.force = new Force(this.api, this.environment, configuration, web3)
    }

    connectAccount = async (signatureProvider: SignatureProvider, web3: Web3, accountName?: string, sig?: string): Promise<any> => {
        let account;
        if (sig) {
            // also do the .sign() method itself here? or keep that in the force?
            const message = 'Effect Account'
            account = this.account.recoverPublicKey(message, sig)
        }

        this.effectAccount = await this.account.getVAccountByName(sig ? account.accountAddress : accountName)
        this.account.setSignatureProvider(this.effectAccount, this.rpc, signatureProvider, web3)
        this.force.setSignatureProvider(this.effectAccount, this.rpc, signatureProvider, web3)
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
