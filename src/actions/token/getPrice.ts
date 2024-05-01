import { DefiBoxPairEnum, getDefiBoxPair } from "./getDefiBoxPair";

/**
 * Get the current price of EFX in USDT
 * @returns {Promis<number>} The current price of EFX in USDT
 */
export const getPrice = async (): Promise<number> => {
	try {
		const eosEfxPair = await getDefiBoxPair(DefiBoxPairEnum.EosEfx);
		const eosUsdtPair = await getDefiBoxPair(DefiBoxPairEnum.EosUsdt);
		const efxUsdt =
			Number(eosEfxPair.price1_last) * Number(eosUsdtPair.price0_last);
		return efxUsdt;
	} catch (error) {
		throw new Error("Error retrieving EFX Ticker Price from DefiBox");
	}
};
