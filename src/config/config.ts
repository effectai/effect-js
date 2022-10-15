import { EffectClientConfig } from './../types/effectClientConfig';

import Web3 from 'web3';

/**
 * Build default configuration object to be passed to client instantiation.
 * @param environment Parameter to define which configuratoin object will be used, defaults ot testnet
 * @param config? Configuration object. Pass configuraiton object in order to set any of the following properties:
 * { network, signatureProvider, relayerKey, eosNodeUrl, web3, apiKey, secure, authentication, authUrl, ipfsNode, forceContract,
 * accountContract, efxTokenContract, efxSymbol, efx_precision, efxExtendedSymbol, eosRelayerAccount, eoelayerPermission }
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
            efxTokenContract:       config?.efxTokenContract       ?? 'effecttokens',
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
            bscTokenDecimals:       config?.bscTokenDecimals       ?? 18,
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://bsc-dataseed.binance.org',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'https://eos.greymass.com',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'https',
            eosNodePort:            config?.eosNodePort            ?? 443,
            eosNodeHost:            config?.eosNodeHost            ?? 'eos.greymass.com',
            eosChainId:             config?.eosChainId             ?? 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            batchSizeLimit:         300,
            taskEstimatedTime:      1.5,
            qualifierAccountId:     config?.qualifierAccountId     ?? 127,
            eosQualifierContract:   config?.eosQualifierContract   ?? 'efxqualifier',
            validationUrl:          config?.validationUrl          ?? 'https://validation-bot-mainnet-t4o43.ondigitalocean.app/',
            ipfsCache:              config?.ipfsCache              ?? true,
            eosTxExpire:            120
        }

    } else if (environment === 'jungle' || environment === 'jungle3' || environment === 'testnet') {
        
        return {
            network:                config?.network                ?? 'testnet',
            signatureProvider:      config?.signatureProvider      ?? null,
            web3:                   config?.web3                   ?? new Web3(config?.bscRpcUrl ?? 'https://bsc-dataseed.binance.org'),
            ipfsNode:               config?.ipfsNode               ?? 'https://ipfs.effect.ai',
            forceContract:          config?.forceContract          ?? 'efxforce1112',
            forceVaccountId:        config?.forceVaccountId        ?? 333,
            accountContract:        config?.accountContract        ?? 'efxaccount11',
            efxTokenContract:       config?.efxTokenContract       ?? 'efxtoken1112',
            efxSymbol:              config?.efxSymbol              ?? 'EFX',
            efxPrecision:           config?.efxPrecision           ?? 4,
            efxExtendedSymbol:      config?.efxExtendedSymbol      ?? '4,EFX',
            eosRelayerAccount:      config?.eosRelayerAccount      ?? 'efxrelayer11',
            eosRelayerPermission:   config?.eosRelayerPermission   ?? 'active',
            eosRelayerUrl:          config?.eosRelayerUrl          ?? 'https://vaccount-relayer-service-jungle-96xyn.ondigitalocean.app',
            payoutDelaySec:         config?.payoutDelaySec         ?? 3600,
            releaseTaskDelaySec:    config?.releaseTaskDelaySec    ?? 1800,
            bscNetworkId:           config?.bscNetworkId           ?? 56,
            bscHexId:               config?.bscHexId               ?? '0x38',
            bscChainName:           config?.bscChainName           ?? 'Binance Smart Chain',
            bscNetworkType:         config?.bscNetworkType         ?? 'Mainnet',
            bscTokenName:           config?.bscTokenName           ?? 'Binance Coin',
            bscTokenSymbol:         config?.bscTokenSymbol         ?? 'BNB',
            bscTokenDecimals:       config?.bscTokenDecimals       ?? 18,
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://bsc-dataseed.binance.org',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://jungle3.bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'https://jungle3history.cryptolions.io',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'https',
            eosNodePort:            config?.eosNodePort            ?? 443,
            eosNodeHost:            config?.eosNodeHost            ?? 'jungle3history.cryptolions.io',
            eosChainId:             config?.eosChainId             ?? '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
            batchSizeLimit:         300,
            taskEstimatedTime:      1.5,
            qualifierAccountId:     config?.qualifierAccountId     ?? 389,
            eosQualifierContract:   config?.eosQualifierContract   ?? 'efxdavid1bot',
            validationUrl:          config?.validationUrl          ?? 'https://validation-bot-jungle-mlolk.ondigitalocean.app',
            ipfsCache:              config?.ipfsCache              ?? true,
            eosTxExpire:            120
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
            web3:                   config?.web3                   ?? new Web3(config?.bscRpcUrl ?? 'https://bsc-dataseed.binance.org'),
            ipfsNode:               config?.ipfsNode               ?? 'https://ipfs.effect.ai',
            forceContract:          config?.forceContract          ?? 'effect.force',
            forceVaccountId:        config?.forceVaccountId        ?? 0, 
            accountContract:        config?.accountContract        ?? 'effect.accnt',
            efxTokenContract:       config?.efxTokenContract       ?? 'effect.token',
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
            bscTokenDecimals:       config?.bscTokenDecimals       ?? 18,
            bscRpcUrl:              config?.bscRpcUrl              ?? 'https://bsc-dataseed.binance.org',
            bscExplorerUrl:         config?.bscExplorerUrl         ?? 'https://bscscan.com',
            bscEfxTokenContract:    config?.bscEfxTokenContract    ?? '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0',
            eosExplorerUrl:         config?.eosExplorerUrl         ?? 'https://local.bloks.io',
            eosNodeUrl:             config?.eosNodeUrl             ?? 'http://localhost:8888',
            eosNodeProtocol:        config?.eosNodeProtocol        ?? 'http',
            eosNodePort:            config?.eosNodePort            ?? 8888,
            eosNodeHost:            config?.eosNodeHost            ?? 'localhost',
            eosChainId:             config?.eosChainId             ?? '8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f',
            batchSizeLimit:         300,
            taskEstimatedTime:      1.5,
            qualifierAccountId:     config?.qualifierAccountId     ?? 389,
            eosQualifierContract:   config?.eosQualifierContract   ?? 'efxdavid1bot',
            validationUrl:          config?.validationUrl          ?? 'https://validation-bot-jungle-mlolk.ondigitalocean.app',
            ipfsCache:              config?.ipfsCache              ?? true,
            eosTxExpire:            120
        }

    } else {
        throw new Error('no default config is being used, make sure you specified configuration object for the environment you are using when creating a client effectSDK.EffectClient("main"). ')
    }
}


