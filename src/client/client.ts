import { defaultConfiguration } from './../config/config';
import { Api, JsonRpc } from 'eosjs'
import { EffectAccount } from '../effect-account/effectAccount'
import { Force } from '../force/force'
import { EffectClientConfig } from '../types/effectClientConfig'
import { isBscAddress } from '../utils/bscAddress'
import { nameToHex } from '../utils/hex'
// import fetch from 'node-fetch' // fetch for node.js environment
import fetch from 'cross-fetch';

export class EffectClient {
    api: Api;
    // TODO: think about the names account/effectaccount/accountrow
    effectAccount: EffectAccount;

    // TODO: type transaction row o.i.d?
    account: object;
    force: Force;
    config: EffectClientConfig;
    environment: string;

    constructor(environment: string = 'testnet', configuration?: EffectClientConfig) {
        this.environment = environment;
        this.config = defaultConfiguration(environment, configuration)
        // TODO clean up these variables?
        const { web3, signatureProvider, host } = this.config
        const rpc = new JsonRpc(host, {fetch})

        // if it's web3 instance (bsc account) use the relayer as signatureProvider
        this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
    }


    initAccount = async (accountName: string, configuration: EffectClientConfig): Promise<any> => {
        this.config = defaultConfiguration(this.environment, configuration)
        const { web3, signatureProvider, host } = this.config
        const rpc = new JsonRpc(host, {fetch})

        // get vaccount row
        this.account = await this.getVAccountByName(accountName)
        console.log('accountrow', this.account)
        this.api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})

        // hmm think about how to structure effectAccount and force
        this.effectAccount = new EffectAccount(this.account, this.api, this.environment, configuration, web3)
        this.force = new Force(this.account, this.api, this.environment, configuration, web3)
    }

    // these functions don't need a wallet/signatureprovider
    // TODO: think about where to put these functions:
    // for now here

    /**
     * Get a vaccount
     * @param account - name of the account or bsc
     * @returns - object of the given account name
     */
    getVAccountByName = async (account: string): Promise<Array<object>> => {
        try {
        let accString;

        if(isBscAddress(account)) {
            const address:string = account.length == 42 ? account.substring(2) : account;
            accString = (nameToHex(this.config.efx_token_account) + "00" + address).padEnd(64, "0");
        } else {
            accString = (nameToHex(this.config.efx_token_account) + "01" + nameToHex(account)).padEnd(64, "0");
        }

        const resp = await this.api.rpc.get_table_rows({
            code: this.config.account_contract,
            scope: this.config.account_contract,
            index_position: 2,
            key_type: "sha256",
            lower_bound: accString,
            upper_bound: accString,
            table: 'account',
            json: true,
        }).then((data) => {
            return data.rows;
        });

        return resp;
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Get a vaccount
     * @param id - id of the account
     * @returns - object of the given account id
     */
    getVAccountById = async (id: number): Promise<Array<object>> => {
        try {
            const resp = await this.api.rpc.get_table_rows({
                code: this.config.account_contract,
                scope: this.config.account_contract,
                index_position: 1,
                key_type: "sha256",
                lower_bound: id,
                upper_bound: id,
                table: 'account',
                json: true,
            }).then((data) => {
                return data.rows;
            });

            return resp;
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Open a vaccount
     * @param account - name or address of the account to open, for BSC addresses without 0x
     * @returns
     */
    openAccount = async (account: string, permission: string): Promise<object> => {
        try {
            let type = 'name'
            let address: string
            if(isBscAddress(account)) {
            type = 'address'
            address = account.length == 42 ? account.substring(2) : account;
            }

            const result = await this.api.transact({
                actions: [{
                    account: this.config.account_contract,
                    name: 'open',
                    authorization: [{
                    actor: type == 'address' ? this.config.eos_relayer : account,
                    permission: permission ? permission : this.config.eos_relayer_permission,
                    }],
                    data: {
                    acc: [type, type == 'address' ? address : account],
                    symbol: {contract: this.config.efx_token_account, sym: this.config.efx_extended_symbol},
                    payer: type == 'address' ? this.config.eos_relayer : account,
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
