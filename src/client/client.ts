import { defaultConfiguration } from './../config/config';
import { Api, JsonRpc } from 'eosjs'
import { Account } from '../account/account'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
import { EffectAccount } from '../types/effectAccount';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import Web3 from 'web3';
import { eosWalletAuth } from '../types/eosWalletAuth';
import fetch from 'cross-fetch';
import retry from 'async-retry'
import { MiddlewareManager } from 'js-middleware';
export class EffectClient {
    api: Api;
    account: Account;
    effectAccount: EffectAccount;
    force: Force;
    config: EffectClientConfig;
    rpc: JsonRpc;
    fetch: any;
    blob: any;
    formData: any;

    constructor(environment: string = 'testnet', configuration?: EffectClientConfig) {
        // TODO: set relayer, after merge with relayer branch
        this.config = defaultConfiguration(environment, configuration)
        const { signatureProvider, host } = this.config

        this.rpc = new JsonRpc(host, { fetch })
        this.api = new Api({ rpc: this.rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

        this.account = new Account(this.api, this.config)
        this.force = new Force(this.api, this.config)

        const accountMiddleWare = new MiddlewareManager(this.account)
        const forceMiddleWare = new MiddlewareManager(this.force)

        accountMiddleWare.use('updatevAccountRows', this.account.isAccountConnected)
        forceMiddleWare.use('joinCampaign', this.force.isAccountConnected)
        forceMiddleWare.use('uploadCampaign', this.force.isAccountConnected)
        forceMiddleWare.use('createCampaign', this.force.isAccountConnected)
        forceMiddleWare.use('createBatch', this.force.isAccountConnected)
        forceMiddleWare.use('reserveTask', this.force.isAccountConnected)
        forceMiddleWare.use('submitTask', this.force.isAccountConnected)
    
    }
    /**
     * Connect Account to SDK
     * @param provider 
     * @param eosAccount
     * @returns EffectAccount
     */
    connectAccount = async (provider: SignatureProvider | Web3, eosAccount?: eosWalletAuth): Promise<EffectAccount> => {
        try {
            let web3;
            let eosSignatureProvider;

            if (provider instanceof Web3) {
                let bscAccount;
                web3 = provider;
                const message = 'Effect Account'
                const signature = await this.sign(web3, message)
                bscAccount = await this.account.recoverPublicKey(message, signature)

                this.effectAccount = {
                    accountName: bscAccount.accountAddress,
                    address: web3.eth.accounts.wallet[0].address,
                    privateKey: web3.eth.accounts.wallet[0].privateKey
                }

            } else {
                eosSignatureProvider = provider;
                this.effectAccount = { accountName: eosAccount.accountName, permission: eosAccount.permission, address: eosAccount.publicKey }
                this.api = new Api({ rpc: this.rpc, signatureProvider: eosSignatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
            }

            await this.account.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)
            await this.force.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)

            this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)

            // if account doesnt exists: openAccount
            if (!this.effectAccount.vAccountRows || !this.effectAccount.vAccountRows.length) {
                const openedAccount = await this.account.openAccount(this.effectAccount.accountName)
                console.log('Opened account:', openedAccount);

                await retry(async () => {
                    console.log('getVAccountByName after openAccount')
                    this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)
                }, {
                    retries: 5,
                    onRetry: (error, number) => {
                        console.log('attempt', number, error)
                    }
                })
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
            const privateKey = web3.eth.accounts.wallet[0].privateKey

            if (privateKey) {
                return (await web3.eth.accounts.sign(message, privateKey)).signature
            } else {
                return await web3.eth.sign(message, address)
            }
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

}
