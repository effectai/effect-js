import type { Network } from "../types/network";
import { defaultNetworkConfig } from "./config";

export const jungle4: Network = {
	name: "jungle4",
	url: "https://jungle4.cryptolions.io/",
	id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
	config: {
		efx: {
			token: {
				symbol: "EFX",
				precision: 4,
			},
			contracts: {
				tasks: "effecttasks2",
				token: "efxtoken1112",
				usdt: "tethertether",
				eostoken: "eosio.token",
				stake: "efxstake1111",
				feepool: "efxfeepool11",
				proposals: "efxproposals",
				vaccount: "efxaccount11",
				dao: "theeffectdao",
			},
		},
		// use default values for ipfs, atomic, and relayer
		...defaultNetworkConfig(),
	},
};

export const eos: Network = {
	name: "eos",
	url: "https://eos.greymass.com/",
	id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
	config: {
		efx: {
			token: {
				symbol: "EFX",
				precision: 4,
			},
			contracts: {
				tasks: "tasks.efx",
				token: "effecttokens",
				usdt: "tethertether",
				eostoken: "eosio.token",
				stake: "efxstakepool",
				feepool: "feepool.efx",
				proposals: "daoproposals",
				vaccount: "vaccount.efx",
				dao: "theeffectdao",
			},
		},
		// use default values for ipfs, atomic, and relayer
		...defaultNetworkConfig(),
	},
};

export const networks = [eos, jungle4];
