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
            if (bsc && bsc.wallet) {
                console.log(bsc)
                // TODO: add sign function here
                const message = 'Effect Account'
                const signature = await this.sign(bsc, message)
                account = await this.account.recoverPublicKey(message, signature)
            }

            if(bsc && bsc.wallet) {
                this.effectAccount = { accountName: account.accountAddress, publicKey: bsc.wallet.address, privateKey: bsc.wallet.privateKey ? bsc.wallet.privateKey : null, vAccountRows: null }
            } else if (eos && eos.auth) {
                this.effectAccount = { accountName: eos.auth.accountName, permission: eos.auth.permission, publicKey: eos.auth.publicKey, vAccountRows: null }
                this.api = new Api({rpc: this.rpc, signatureProvider: eos ? eos.signatureProvider : null, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
            }

            // TODO: if account doesnt exists do openAccount
            this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)

            this.account.setSignatureProvider(this.effectAccount)
            this.force.setSignatureProvider(this.effectAccount)

            return this.effectAccount
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    sign = async (bsc, message: string): Promise<string> => {
        // BSC-Extensions only support 'eth_sign'
        // https://binance-wallet.gitbook.io/binance-chain-extension-wallet/dev/get-started#binancechain-request-method-eth_sign-params-address-message
        bsc.web3.extend({
            property: 'bsc',
            methods: [{
                name: 'sign',
                call: 'eth_sign',
                params: 2
            }]
        })
    
        try {
            if (bsc.currentProvider === bsc.binance) {
                return await bsc.web3.bsc.sign(bsc.wallet.address, message)
            } else if (bsc.currentProvider === 'burner-wallet') {
                return (await bsc.web3.eth.accounts.sign(message, bsc.wallet.privateKey)).signature
            } else {
                return await bsc.web3.eth.personal.sign(message, bsc.wallet.address)
            }
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    // TODO: updateblockchaininfo here
    updateBlockchainInfo = async (): Promise<any> => {

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
