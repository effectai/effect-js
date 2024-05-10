import type { AtomicConfig, IpfsConfig, RelayerConfig } from "../types/network";

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

export const defaultNetworkConfig = () => ({
	ipfs: ipfsConfig,
	atomic: atomicConfig,
	relayer: relayerConfig,
});
