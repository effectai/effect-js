import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import Web3 from "web3";

/**
 * Options that can be passed to the client factory.
 */
 export interface EffectClientConfig {

    /**
     * The network to connect to.
     */
    network: "mainnet" | "kylin" | string

    /**
     * EOS Signature Provider
     */
    signatureProvider: JsSignatureProvider | SignatureProvider

    /**
     * Relayer Key
     */
    relayerKey: '5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr' | string

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
     * TODO: Update this url when this service is created.
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

    /**
     * IPFS
     * @default https://ipfs.effect.ai
     */
     ipfs_node: 'https://ipfs.effect.ai' | string


    /**
     * Force Contract
     */
     force_contract: "forceonkyli2" | string

     /**
      * Account Contract
      */
     account_contract: 'acckylin1111' | string

    /**
     * EFX Token account
     */
     efx_token_account: "tokenonkylin" | string

     /**
      * EFX Token Symbol
      */
     efx_symbol: "UTL" | string

     /**
      * EFX Token Precision
      */
     efx_precision: 4 | number

     /**
      * Extended Symbol
      */
     efx_extended_symbol: '4,UTL' | string

     /**
      * Eos Relayer
      */
     eos_relayer: "pixeos1gswap" | string

     /**
      * Relayer Permission
      */
     eos_relayer_permission: "active" | string

}

/**
 * Build default configuration object to be passed to client instantiation.
 * 
 */
export const defaultConfiguration = (environment: string = 'testnet', config?: EffectClientConfig): EffectClientConfig => {
    if (environment == 'testnet') {
        return {
            network: config.network ?? "kylin",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']),
            relayerKey: config.relayerKey ?? '5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr',
            host: config.host ?? 'api.kylin.alohaeos.com',
            web3: config.web3 ?? new Web3,
            apiKey: config.apiKey ?? '',
            secure: config.secure ?? false,
            authentication: config.authentication ?? false,
            authUrl: config.authUrl ?? '',
            ipfs_node: config.ipfs_node ?? 'https://ipfs.effect.ai',
            force_contract: config.force_contract ?? "forceonkyli2",
            account_contract: config.account_contract ?? 'acckylin1111',
            efx_token_account: config.efx_token_account ?? "tokenonkylin",
            efx_symbol: config.efx_symbol ?? "UTL",
            efx_precision: config.efx_precision ?? 4,
            efx_extended_symbol: config.efx_extended_symbol ?? '4,UTL',
            eos_relayer: config.eos_relayer ?? "pixeos1gswap",
            eos_relayer_permission: config.eos_relayer_permission ?? "active"
        }
    } else {
        // TODO add proper configuration values here.
        return {
            network: config.network ?? "mainnet",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']),
            relayerKey: config.relayerKey ?? '5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr',
            host: config.host ?? 'eos.greymass.com',
            web3: config.web3 ?? new Web3,
            apiKey: config.apiKey ?? '',
            secure: config.secure ?? false,
            authentication: config.authentication ?? false,
            authUrl: config.authUrl ?? '',
            ipfs_node: config.ipfs_node ?? 'https://ipfs.effect.ai',
            force_contract: config.force_contract ?? "forceonkyli2",
            account_contract: config.account_contract ?? 'acckylin1111',
            efx_token_account: config.efx_token_account ?? "tokenonkylin",
            efx_symbol: config.efx_symbol ?? "EFX",
            efx_precision: config.efx_precision ?? 4,
            efx_extended_symbol: config.efx_extended_symbol ?? '4,EFX',
            eos_relayer: config.eos_relayer ?? "pixeos1gswap",
            eos_relayer_permission: config.eos_relayer_permission ?? "active"
        }
    }
}