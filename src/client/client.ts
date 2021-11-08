import { defaultConfiguration } from './../config/config';
import { Api, JsonRpc } from 'eosjs'
import { Account } from '../account/account'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
import fetch from '@web-std/fetch'
import { EffectAccount } from '../types/effectAccount';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import Web3 from 'web3';
import { eosWalletAuth } from '../types/eosWalletAuth';
const retry = require('async-retry')

export class EffectClient {
    api: Api;
    account: Account;
    effectAccount: EffectAccount;
    force: Force;
    config: EffectClientConfig;
    environment: string;
    rpc: JsonRpc;

    constructor(environment: string = 'testnet', configuration?: EffectClientConfig) {
        // TODO: set relayer, after merge with relayer branch
        this.environment = environment;
        this.config = defaultConfiguration(environment, configuration)
        const { web3, signatureProvider, host } = this.config

        this.rpc = new JsonRpc(host, { fetch })
        this.api = new Api({ rpc: this.rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

        this.account = new Account(this.api, this.config)
        this.force = new Force(this.api, this.config)
    }

    /**
     * Connect Account to SDK
     * @param chain 
     * @param signatureProvider 
     * @param web3
     * @param eosAccount 
     * @returns 
     */
    connectAccount = async (chain: string, signatureProvider?: SignatureProvider, web3?: Web3, eosAccount?: eosWalletAuth): Promise<EffectAccount> => {
        try {
            let account;
            let bscAddress;
            if (chain === 'bsc') {
                const message = 'Effect Account'
                const signature = await this.sign(web3, message)
                bscAddress = web3.eth.accounts.wallet[0].address
                account = await this.account.recoverPublicKey(message, signature)
            }

            if (chain === 'bsc') {
                // TODO: privateKey for burnerwallet?
                this.effectAccount = { accountName: account.accountAddress, publicKey: bscAddress, privateKey: null, vAccountRows: null }
            } else if (signatureProvider) {
                this.effectAccount = { accountName: eosAccount.accountName, permission: eosAccount.permission, publicKey: eosAccount.publicKey, vAccountRows: null }
                this.api = new Api({ rpc: this.rpc, signatureProvider: signatureProvider ? signatureProvider : null, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
            }

            console.log(`Setting signature provider.`);
            this.account.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)
            this.force.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)
            console.log(`Signature provider set.`);

            try {
                console.log(`Getting vAccountByName, ${JSON.stringify(this.effectAccount)}`)
                this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)
                console.log(`Finished, vAccountByName, ${JSON.stringify(this.effectAccount)}`)
            } catch (e) {
                // if account doesnt exists: openAccount
                if (!this.effectAccount.vAccountRows) {
                    const openedAccount = await this.account.openAccount(this.effectAccount.accountName)
                    console.log(`Opened account: ${openedAccount}`);

                    await retry(async () => {
                        console.log('retry: getVAccountByName after openAccount')
                        this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)
                    }, {
                        retries: 5,
                        onRetry: (error, number) => {
                            console.log('attempt', number, error)
                        }
                    })
                }
            }

            return this.effectAccount
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    /**
     * BSC Sign
     * @param bsc 
     * @param message 
     * @returns 
     */
    sign = async (web3: Web3, message: string): Promise<string> => {
        try {
            const address = web3.eth.accounts.wallet[0].address
            // TODO: how to detect if its a burner-wallet?
            if (web3.currentProvider === 'burner-wallet') {
                // TODO: need to find another solution to sign without giving the private key again
                return (await web3.eth.accounts.sign(message, '')).signature
            } else {
                return await web3.eth.sign(message, address)
            }
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
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
