import { ClientConfig } from './types/config';

const configPresets: {[key: string]: ClientConfig} = {
  'jungle4': {
    network: 'jungle4',
    eosExplorerUrl: '',
    eosRpcUrl: 'https://jungle4.greymass.com/',
    ipfsEndpoint: 'https://ipfs.effect.ai',
    tasksContract: 'effecttasks2',
    tokenContract: 'efxtoken1112',
    stakeContract: 'efxstake1111',
    feepoolContract: 'efxfeepool11',
    proposalsContract: 'efxproposals',
    vaccountContract: 'efxaccount11',
    daoContract: 'efxdao111112',
    efxSymbol: 'EFX',
    efxPrecision: 4,
    eosRelayerAccount: 'effectrelayr',
    eosRelayerPermission: 'active',
    eosRelayerUrl: 'https://vaccount-relayer-service-jungle-96xyn.ondigitalocean.app',
    forceVaccountId: 0, // TODO
    ipfsCache: true
  }
};

export { configPresets };
