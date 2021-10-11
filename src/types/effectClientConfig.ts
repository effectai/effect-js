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