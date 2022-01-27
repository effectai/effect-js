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
        forceMiddleWare.use('getCampaignJoins', this.force.isAccountConnected)
        // forceMiddleWare.use('getMyLastCampaign', this.force.isAccountConnected)
    }
    /**
     * Connect Account to SDK
     * @param provider 
     * @param eosAccount
     * @returns EffectAccount
     */
    connectAccount = async (provider: SignatureProvider | Web3, account?: eosWalletAuth): Promise<EffectAccount> => {
        try {
            let web3;
            let eosSignatureProvider;
            if (!provider) {
                throw new Error('Please provide a BSC Web3 or EOS SignatureProvider')
            }
            // @ts-ignore
            if (provider.eth) {
                let bscAccount;
                web3 = provider;
                if (!account || !account.accountName) {
                    const message = 'Effect Account'
                    const signature = await this.sign(web3, message)
                    bscAccount = await this.account.recoverPublicKey(message, signature)
                }

                this.effectAccount = {
                    accountName: bscAccount ? bscAccount.accountName : account.accountName,
                    address: web3.eth.accounts.wallet[0] ? web3.eth.accounts.wallet[0].address : (await web3.eth.getAccounts())[0],
                    privateKey: web3.eth.accounts.wallet[0] ? web3.eth.accounts.wallet[0].privateKey : null
                }
            } else {
                eosSignatureProvider = provider;
                this.effectAccount = { accountName: account.accountName, permission: account.permission, address: account.publicKey }
                this.api = new Api({ rpc: this.rpc, signatureProvider: eosSignatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
            }

            await this.account.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)
            await this.force.setSignatureProvider(this.effectAccount, this.api, web3 ? web3 : null)

            this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)

            // if account doesnt exists: openAccount
            if (!this.effectAccount.vAccountRows || !this.effectAccount.vAccountRows.length) {
                const openedAccount = await this.account.openAccount(this.effectAccount.accountName, this.effectAccount.permission)
                // console.log('Opened account:', openedAccount);
                // @ts-ignore
                await this.force.waitTransaction(openedAccount)
                this.effectAccount.vAccountRows = await this.account.getVAccountByName(this.effectAccount.accountName)
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
            const address = web3.eth.accounts.wallet[0] ? web3.eth.accounts.wallet[0].address : (await web3.eth.getAccounts())[0]
            const privateKey = web3.eth.accounts.wallet[0] ? web3.eth.accounts.wallet[0].privateKey : null
            if (privateKey) {
                return (await web3.eth.accounts.sign(message, privateKey)).signature
            } else {
                return await web3.eth.personal.sign(message, address, '')
            }
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

}
