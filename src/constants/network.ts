import type { Network } from "../types/network";
import { defaultNetworkConfig } from "./config";

export const jungle4: Network = {
	name: "jungle4",
	explorerUrl: "https://jungle4.eosq.eosnation.io/",
	eosRpcUrl: "https://jungle4.greymass.com/",
	eosChainId:
		"73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",

	config: defaultNetworkConfig,
};

export const eos: Network = {
	name: "eos",
	explorerUrl: "https://eos.eosq.eosnation.io/",
	eosRpcUrl: "https://eos.greymass.com/",
	eosChainId:
		"73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",

	config: defaultNetworkConfig,
};

export const chains = [eos, jungle4];
