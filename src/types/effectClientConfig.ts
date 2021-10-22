import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import Web3 from "web3";

/**
 * TODO Add examples and defaults to all of the comment documentation
 * Options that can be passed to the client factory.
 */
 export interface EffectClientConfig {

    /**
     * The network to connect to.
     * @default mainnet or kylin
     */
    network: string

    /**
     * EOS Signature Provider
     */
    signatureProvider: JsSignatureProvider | SignatureProvider

    /**
     * The host where the json-rpc will connect to.
     * @default "localhost", "eos.greymass.com", "api.kylin.alohaeos.com"
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
     ipfs_node: string


    /**
     * Force Contract
     * @default '', forceonkyli2
     */
     force_contract: string

     /**
      * Account Contract
      * @default "acckylin1111"
      */
     account_contract: string

    /**
     * EFX Token account
     * @default "tokenonkylin"
     */
     efx_token_account: string

     /**
      * EFX Token Symbol
      * 'EFX', 'UTL'
      */
     efx_symbol: string

     /**
      * EFX Token Precision
      * 4
      */
     efx_precision: number

     /**
      * Extended Symbol
      * @default '4, EFX', '4,UTL'
      */
     efx_extended_symbol: string

     /**
      * Eos Relayer
      */
     eos_relayer: string

     /**
      * Relayer Permission
      * @default "active"
      */
     eos_relayer_permission: string

     /**
      * Relayer url
      */
     eos_relayer_url

}

