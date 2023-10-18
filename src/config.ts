import { ClientConfig } from './types/config';

const configPresets: {[key: string]: ClientConfig} = {
    'jungle4': {
        network: 'jungle4',
        explorerUrl: 'https://jungle4.eosq.eosnation.io/',
        eosRpcUrl: 'https://jungle4.greymass.com/',
        eosChainId: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
        ipfsEndpoint: 'https://ipfs.effect.ai',
        atomicHubIpfsEndpoint: 'https://atomichub-ipfs.com/ipfs/',
        atomicHubAssetEndpoint: 'https://eos.atomichub.io/explorer/asset/',
        tasksContract: 'effecttasks2',
        tokenContract: 'efxtoken1112',
        stakeContract: 'efxstake1111',
        feepoolContract: 'efxfeepool11',
        proposalsContract: 'efxproposals',
        vaccountContract: 'efxaccount11',
        daoContract: 'theeffectdao',
        atomicAssetsContract: 'atomicassets',
        efxSymbol: 'EFX',
        efxPrecision: 4,
        eosRelayerAccount: 'effectrelayr',
        eosRelayerPermission: 'active',
        eosRelayerUrl: 'https://vaccount-relayer-service-jungle-96xyn.ondigitalocean.app',
        ipfsCache: true
    },
    'eos': {
        network: 'eos',
        explorerUrl: 'https://eos.eosq.eosnation.io/',
        eosRpcUrl: 'https://eos.greymass.com/',
        eosChainId: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
        ipfsEndpoint: 'https://ipfs.effect.ai',
        atomicHubIpfsEndpoint: 'https://atomichub-ipfs.com/ipfs/',
        atomicHubAssetEndpoint: 'https://eos.atomichub.io/explorer/asset/',
        tasksContract: 'effecttasks2',
        tokenContract: 'efxtoken1112',
        stakeContract: 'efxstake1111',
        feepoolContract: 'efxfeepool11',
        proposalsContract: 'efxproposals',
        vaccountContract: 'efxaccount11',
        daoContract: 'theeffectdao',
        atomicAssetsContract: 'atomicassets',
        efxSymbol: 'EFX',
        efxPrecision: 4,
        eosRelayerAccount: 'effectrelayr',
        eosRelayerPermission: 'active',
        eosRelayerUrl: 'https://vaccount-relayer-service-jungle-96xyn.ondigitalocean.app',
        ipfsCache: true
    }
};

export { configPresets };
