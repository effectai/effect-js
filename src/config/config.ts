import { EffectClientConfig } from './../types/effectClientConfig';
import Web3 from 'web3';

/**
 * Build default configuration object to be passed to client instantiation.
 * @param environment Parameter to define which configuratoin object will be used, defaults ot testnet
 * @param config? Configuration object. Pass configuraiton object in order to set any of the following properties:
 * { network, signatureProvider, relayerKey, eosNodeUrl, web3, apiKey, secure, authentication, authUrl, ipfsNode, forceContract,
 * accountContract, efxTokenAccount, efxSymbol, efx_precision, efxExtendedSymbol, eosRelayerAccount, eosRelayerPermission }
 * @example defaultConfiguration(environment = 'mainnet', config = {network: 'mainnet, bscRpcUrl: 'wss://bsc-ws-node.nariox.org:443', ipfsNode: 'https://ifps.effect.ai'})
 */

// TODO - The user should pass a config object, but it is not nessecary to specify all the properties, some of them should be optional. 
// Should a new interface be created to pass a user defined config object?
export const defaultConfiguration = (environment: string = 'testnet', config?: EffectClientConfig): EffectClientConfig => {
    
    if (environment === 'mainnet' || environment === 'main' || environment === 'app') {
        
        return {
            network:                config?.network                ?? 'mainnet',
            signatureProvider:      config?.signatureProvider      ?? null,
            web3:                   config?.web3                   ?? new Web3(config?.bscRpcUrl ?? 'https://bsc-dataseed.binance.org'), 
            ipfsNode:               config?.ipfsNode               ?? 'https://ipfs.effect.ai',
            forceContract:          config?.forceContract          ?? 'force.efx',
            accountContract:        config?.accountContract        ?? 'vaccount.efx',
            efxTokenAccount:        config?.efxTokenAccount        ?? 'effecttokens',
            efxSymbol:              config?.efxSymbol              ?? 'EFX',
            efxPrecision:           config?.efxPrecision           ?? 4,
            efxExtendedSymbol:      config?.efxExtendedSymbol      ?? '4,EFX',
            eosRelayerAccount:      config?.eosRelayerAccount      ?? 'efxtxrelayer',
            eosRelayerPermission:   config?.eosRelayerPermission   ?? 'active',
            eosRelayerUrl:          config?.eosRelayerUrl          ?? 'https://vaccount-relayer-service-mainnet-qyy9z.ondigitalocean.app',
            forceVaccountId:        config?.forceVaccountId        ?? 0,
            payoutDelaySec:         config?.payoutDelaySec         ?? 3600,
            releaseTaskDelaySec:    config?.releaseTaskDelaySec    ?? 1800,
            bscNetworkId:           config?.bscNetworkId           ?? 56,
            bscHexId:               config?.bscHexId               ?? '0x38',
            bscChainName:           config?.bscChainName           ?? 'Binance Smart Chain',
            bscNetworkType:         config?.bscNetworkType         ?? 'Mainnet',
            bscTokenName:           config?.bscTokenName           ?? 'Binance Coin',
            bscTokenSymbol:         config?.bscTokenSymbol         ?? 'BNB',
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://bsc-dataseed.binance.org',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'https://greymass.com:443',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'https',
            eosPort:                config?.eosPort                ?? 443,
            eosHostName:            config?.eosHostName            ?? 'greymass.com'

        }

    } else if (environment === 'jungle' || environment === 'jungle3' || environment === 'testnet') {
        
        return {
            network:                config?.network                ?? 'testnet',
            signatureProvider:      config?.signatureProvider      ?? null,
            web3:                   config?.web3                   ?? new Web3(config?.bscRpcUrl ?? 'https://data-seed-prebsc-1-s1.binance.org:8545'), 
            ipfsNode:               config?.ipfsNode               ?? 'https://ipfs.effect.ai',
            forceContract:          config?.forceContract          ?? 'efxforce1111',
            forceVaccountId:        config?.forceVaccountId        ?? 66,
            accountContract:        config?.accountContract        ?? 'efxaccount11',
            efxTokenAccount:        config?.efxTokenAccount        ?? 'efxtoken1112',
            efxSymbol:              config?.efxSymbol              ?? 'EFX',
            efxPrecision:           config?.efxPrecision           ?? 4,
            efxExtendedSymbol:      config?.efxExtendedSymbol      ?? '4,EFX',
            eosRelayerAccount:      config?.eosRelayerAccount      ?? 'efxrelayer11',
            eosRelayerPermission:   config?.eosRelayerPermission   ?? 'active',
            eosRelayerUrl:          config?.eosRelayerUrl          ?? 'https://vaccount-relayer-service-jungle-rn7et.ondigitalocean.app',
            payoutDelaySec:         config?.payoutDelaySec         ?? 3600,
            releaseTaskDelaySec:    config?.releaseTaskDelaySec    ?? 1800,
            bscNetworkId:           config?.bscNetworkId           ?? 97,
            bscHexId:               config?.bscHexId               ?? '0x61',
            bscChainName:           config?.bscChainName           ?? 'Binance Smart Chain',
            bscNetworkType:         config?.bscNetworkType         ?? 'Testnet',
            bscTokenName:           config?.bscTokenName           ?? 'Binance Coin',
            bscTokenSymbol:         config?.bscTokenSymbol         ?? 'BNB',
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://data-seed-prebsc-1-s1.binance.org:8545',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://testnet.bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://jungle3.bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'https://jungle3.greymass.com:443',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'https',
            eosPort:                config?.eosPort                ?? 443,
            eosHostName:            config?.eosHostName            ?? 'jungle3.greymass.com'

        }

    } else if (environment === 'local') {
        
        /**
         * INFO When spinning up the local node, the first account created should be the force_account.
         * INFO deploy the local relayer service.
         * TODO Add deployment of local efx token on bsc.
         */
        return {
            network:                config?.network                ?? 'local',
            signatureProvider:      config?.signatureProvider      ?? null,
            web3:                   config?.web3                   ?? new Web3(config?.bscRpcUrl ?? 'https://data-seed-prebsc-1-s1.binance.org:8545'),
            ipfsNode:               config?.ipfsNode               ?? 'https://ipfs.effect.ai',
            forceContract:          config?.forceContract          ?? 'effect.force',
            forceVaccountId:        config?.forceVaccountId        ?? 0, 
            accountContract:        config?.accountContract        ?? 'effect.accnt',
            efxTokenAccount:        config?.efxTokenAccount        ?? 'effect.token',
            efxSymbol:              config?.efxSymbol              ?? 'EFX',
            efxPrecision:           config?.efxPrecision           ?? 4,
            efxExtendedSymbol:      config?.efxExtendedSymbol      ?? '4,EFX',
            eosRelayerAccount:      config?.eosRelayerAccount      ?? 'effect.relay',
            eosRelayerPermission:   config?.eosRelayerPermission   ?? 'active',
            eosRelayerUrl:          config?.eosRelayerUrl          ?? 'http://localhost:3001', 
            payoutDelaySec:         config?.payoutDelaySec         ?? 1,
            releaseTaskDelaySec:    config?.releaseTaskDelaySec    ?? 1,
            bscNetworkId:           config?.bscNetworkId           ?? 97,
            bscHexId:               config?.bscHexId               ?? '0x61',
            bscChainName:           config?.bscChainName           ?? 'Binance Smart Chain',
            bscNetworkType:         config?.bscNetworkType         ?? 'Testnet',
            bscTokenName:           config?.bscTokenName           ?? 'Binance Coin',
            bscTokenSymbol:         config?.bscTokenSymbol         ?? 'BNB',
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://data-seed-prebsc-1-s1.binance.org:8545',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://testnet.bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://local.bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'http://localhost:8888',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'http',
            eosPort:                config?.eosPort                ?? 8888,
            eosHostName:            config?.eosHostName            ?? 'localhost'

        }

    } else {
        throw new Error('no default config is being used, make sure you specified configuration object for the environment you are using.')
    }
}


