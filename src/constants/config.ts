import type {
	AtomicConfig,
	EfxConfig,
	IpfsConfig,
	RelayerConfig,
} from "../types/network";

export const efxConfig: EfxConfig = {
	token: {
		symbol: "EFX",
		precision: 4,
	},
	contracts: {
		tasks: "effecttasks2",
		token: "efxtoken1112",
		stake: "efxstake1111",
		feepool: "efxfeepool11",
		proposals: "efxproposals",
		vaccount: "efxaccount11",
		dao: "theeffectdao",
	},
};

export const ipfsConfig: IpfsConfig = {
	ipfsEndpoint: "https://ipfs.effect.ai",
};

export const atomicConfig: AtomicConfig = {
	ipfsEndpoint: "https://atomichub-ipfs.com/ipfs/",
	assetEndpoint: "https://eos.atomichub.io/explorer/asset/",
	atomicContract: "atomicassets",
};

export const relayerConfig: RelayerConfig = {
	eosRelayerAccount: "effectrelayr",
	eosRelayerPermission: "active",
	eosRelayerUrl:
		"https://vaccount-relayer-service-jungle-96xyn.ondigitalocean.app",
};

export const defaultNetworkConfig = {
	efx: efxConfig,
	ipfs: ipfsConfig,
	atomic: atomicConfig,
	relayer: relayerConfig,
};
