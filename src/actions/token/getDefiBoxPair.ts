import { UInt128 } from "@wharfkit/antelope";
import { Client } from "../../client";

export enum DefiBoxPairEnum {
  EosEfx = 191,
  EosUsdt = 12,
}

export const getDefiBoxPair = async (
  client: Client,
  pairEnum: DefiBoxPairEnum,
) => {
  try {
    const { provider } = client;

    const pairResponse = await provider.v1.chain.get_table_rows({
      code: "swap.defi",
      scope: "swap.defi",
      table: "pairs",
      limit: 1,
      lower_bound: UInt128.from(pairEnum.valueOf()),
      upper_bound: UInt128.from(pairEnum.valueOf()),
    });

    const [pair] = pairResponse.rows;

    return pair;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving EFX Ticker Price from DefiBox");
  }
};
