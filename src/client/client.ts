import { defaultConfiguration } from './../config/config';
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { Api, JsonRpc } from 'eosjs'
import { Account } from '../account/account'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
import Web3 from 'web3';
import fetch from 'cross-fetch';
import { EffectAccount } from '../types/effectAccount';

export class EffectClient {
    api: Api;
    account: Account;
    effectAccount: EffectAccount;
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

    // TODO: fix any parameter
    connectAccount = async (eos: any, bsc: any): Promise<EffectAccount> => {
        try {
            let account;
            if (bsc) {
                // TODO: add sign function here
                const sig = '';
                const message = 'Effect Account'
                account = this.account.recoverPublicKey(message, sig)
            }

            console.log('Connect account GO!')

            // TODO: create effectACcount completetly from signature provider or web3 object (extra call)
            // + permission
            // make function to set vAccountRows again, updateBlockchainAccount. 
            // For example in withdraw for the nonce and balance

            // this.account.updateRetrieveNonce()


            if(bsc) {
                console.log('bsc', bsc)
                this.effectAccount = { accountName: null, publicKey: bsc.wallet.address, privateKey: bsc.wallet.privateKey ? bsc.wallet.privateKey : null, vAccountRows: null }
            } else {
                this.effectAccount = { accountName: eos.auth.accountName, permission: eos.auth.permission, publicKey: eos.auth.publicKey, vAccountRows: null }
                this.api = new Api({rpc: this.rpc, signatureProvider: eos ? eos.signatureProvider : null, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
            }

            // TODO: if account doesnt exists do openAccount
            // save
            this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)

            console.log('effect account:', this.effectAccount)

            this.account.setSignatureProvider(this.effectAccount)
            this.force.setSignatureProvider(this.effectAccount)

            return this.effectAccount
        } catch (error) {
            throw new Error(error)
        }
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
