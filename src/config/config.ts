import { EffectClientConfig } from './../types/effectClientConfig';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import Web3 from 'web3';

/**
 * Build default configuration object to be passed to client instantiation.
 * @param environment Parameter to define which configuratoin object will be used, defaults ot testnet
 * @param config? Configuration object. Pass configuraiton object in order to set any of the following properties:
 * { network, signatureProvider, relayerKey, host, web3, apiKey, secure, authentication, authUrl, ipfs_node, force_contract,
 * account_contract, efx_token_account, efx_symbol, efx_precision, efx_extended_symbol, eos_relayer, eos_relayer_permission }
 * @example defaultConfiguration(environment = 'mainnet', config = {network: 'mainnet', apiKey: 'abc123', ipfs_node: 'https://ifps.effect.ai'})
 */
// TODO is there a more elegant way of building these multiple configuration objects? DRY?
export const defaultConfiguration = (environment: string = 'testnet', config?: EffectClientConfig): EffectClientConfig => {

    if (config.network === 'kylin') {
        return {
            network: config.network ?? "kylin",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5KKjmMyCfdvmw1bhGJ8gsUDGmaW1Dph3B9WVjYvyiQNMGJuvPG2']),
            host: config.host ?? 'https://api.kylin.alohaeos.com',
            web3: config.web3 ?? new Web3, // TODO double check this, I think it should be something else.
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
            eos_relayer: config.eos_relayer ?? "jabbarndcn22",
            eos_relayer_permission: config.eos_relayer_permission ?? "active"
        }
    } else {
        // TODO add proper configuration values here.
        return {
            network: config.network ?? "mainnet",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']),
            host: config.host ?? 'eos.greymass.com',
            web3: config.web3 ?? new Web3, // TODO double check this, I think it should be something else.
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
