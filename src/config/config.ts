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
export const defaultConfiguration = (environment: string = 'testnet', config: any = {}): EffectClientConfig => {
    if (environment === 'mainnet' || environment === 'main') {
        // TODO add proper configuration values for mainnet.
        return {
            network: config.network ?? "mainnet",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']),
            host: config.host ?? 'https://eos.greymass.com',
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
            eos_relayer_permission: config.eos_relayer_permission ?? "active",
            eos_relayer_url: config.eos_relayer_url ?? "http://localhost:3001",
            force_vaccount_id: config.force_vaccount_id,
            payout_delay_sec: config.payout_delay_sec ?? 3600,
            release_task_delay_sec: config.release_task_delay_sec ?? 1800
        }
    } else if (environment === 'testnet' || environment === 'kylin' || environment === 'test') {
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
            force_vaccount_id: config.force_vaccount_id ?? 163,
            account_contract: config.account_contract ?? 'acckylin1111',
            efx_token_account: config.efx_token_account ?? "tokenonkylin",
            efx_symbol: config.efx_symbol ?? "UTL",
            efx_precision: config.efx_precision ?? 4,
            efx_extended_symbol: config.efx_extended_symbol ?? '4,UTL',
            eos_relayer: config.eos_relayer ?? "kylinrelayer",
            eos_relayer_permission: config.eos_relayer_permission ?? "active",
            eos_relayer_url: config.eos_relayer_url ?? "https://vaccount-relayer-service-bsrkv.ondigitalocean.app",
            payout_delay_sec: config.payout_delay_sec ?? 3600,
            release_task_delay_sec: config.release_task_delay_sec ?? 1800

        }
    } else if (environment === 'jungle' || environment === 'jungle3') {
        return {
            network: config.network ?? "jungle",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5KiS67ujRiD8JSocMDd8JgqurPs5tpPjiezKtM6Jb3z8oTWULWd']),
            host: config.host ?? 'https://jungle3.greymass.com',
            web3: config.web3 ?? new Web3, // TODO double check this, I think it should be something else.
            apiKey: config.apiKey ?? '',
            secure: config.secure ?? false,
            authentication: config.authentication ?? false,
            authUrl: config.authUrl ?? '',
            ipfs_node: config.ipfs_node ?? 'https://ipfs.effect.ai',
            force_contract: config.force_contract ?? "efxforce1111",
            force_vaccount_id: config.force_vaccount_id ?? 66,
            account_contract: config.account_contract ?? 'efxaccount11',
            efx_token_account: config.efx_token_account ?? "efxtoken1112",
            efx_symbol: config.efx_symbol ?? "EFX",
            efx_precision: config.efx_precision ?? 4,
            efx_extended_symbol: config.efx_extended_symbol ?? '4,EFX',
            eos_relayer: config.eos_relayer ?? "efxrelayer11",
            eos_relayer_permission: config.eos_relayer_permission ?? "active",
            eos_relayer_url: config.eos_relayer_url ?? "https://vaccount-relayer-service-jungle-rn7et.ondigitalocean.app",
            payout_delay_sec: config.payout_delay_sec ?? 3600,
            release_task_delay_sec: config.release_task_delay_sec ?? 1800
        }
    } else if (environment === 'local') {
        return {
            network: config.network ?? "local",
            signatureProvider: config.signatureProvider ?? new JsSignatureProvider(['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3']),
            host: config.host ?? 'http://localhost:8888',
            web3: config.web3 ?? new Web3, 
            apiKey: config.apiKey ?? '',
            secure: config.secure ?? false,
            authentication: config.authentication ?? false,
            authUrl: config.authUrl ?? '',
            ipfs_node: config.ipfs_node ?? 'https://ipfs.effect.ai',
            force_contract: config.force_contract ?? "effect.force",
            force_vaccount_id: config.force_vaccount_id ?? 0, // TODO When spinning up the local node, the first account created should be the force_account.
            account_contract: config.account_contract ?? 'effect.accnt',
            efx_token_account: config.efx_token_account ?? "effect.token",
            efx_symbol: config.efx_symbol ?? "EFX",
            efx_precision: config.efx_precision ?? 4,
            efx_extended_symbol: config.efx_extended_symbol ?? '4,EFX',
            eos_relayer: config.eos_relayer ?? "effect.relay",
            eos_relayer_permission: config.eos_relayer_permission ?? "active",
            eos_relayer_url: config.eos_relayer_url ?? "http://localhost:3001", // TODO deploy the local relayer service.
            payout_delay_sec: config.payout_delay_sec ?? 1,
            release_task_delay_sec: config.release_task_delay_sec ?? 1
        }
    } else {
        console.log('no default config is being used, make sure you specified all config')
        return config;
    }
}
