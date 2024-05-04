import type { ChainDefinitionType } from "@wharfkit/session";

export type Network = ChainDefinitionType & {
	config: NetworkConfig;
};
export interface AtomicConfig {
	atomicContract: string;
	ipfsEndpoint: string;
	assetEndpoint: string;
}

export interface EfxConfig {
	token: {
		symbol: string;
		precision: number;
	};
	contracts: {
		tasks: string;
		token: string;
		stake: string;
		feepool: string;
		proposals: string;
		vaccount: string;
		dao: string;
	};
}

export interface RelayerConfig {
	eosRelayerAccount: string;
	eosRelayerPermission: string;
	eosRelayerUrl: string;
}

export interface IpfsConfig {
	ipfsEndpoint: string;
}

export interface NetworkConfig {
	ipfs: IpfsConfig;
	atomic: AtomicConfig;
	efx: EfxConfig;
	relayer: RelayerConfig;
}
