import { Client } from "../../client";
import { DefiBoxPairEnum, getDefiBoxPair } from "./getDefiBoxPair";

export const getPrice = async (client: Client): Promise<number> => {
  try {
    const eosEfxPair = await getDefiBoxPair(client, DefiBoxPairEnum.EosEfx);
    const eosUsdtPair = await getDefiBoxPair(client, DefiBoxPairEnum.EosUsdt);
    const efxUsdt =
      Number(eosEfxPair.price1_last) * Number(eosUsdtPair.price0_last);
    return efxUsdt;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving EFX Ticker Price from DefiBox");
  }
};
