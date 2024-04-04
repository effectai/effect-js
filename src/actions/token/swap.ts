import { AnyAction, Asset, NameType } from "@wharfkit/antelope";
import { DefiBoxPairEnum } from "./getDefiBoxPair";
import { getPrice } from "./getPrice";
import type { Client } from "../../client";

export enum swapDirection {
  // @ts-expect-error
  EfxToUsdt = `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
  // @ts-expect-error
  UsdtToEfx = `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`,
}

export const buildSwapAction = (
  direction: swapDirection,
  actor: NameType,
  authorization: { permission: NameType; actor: NameType }[],
  amount: number,
  efxPrice: number,
) => {
  if (!authorization || !authorization.length || !actor) {
    throw new Error("No authorization provided");
  }

  if (!amount || !efxPrice) {
    throw new Error("Amount or EFX price not provided");
  }

  const valueAmount = efxPrice * amount;

  const swapAction: {
    [key: string]: AnyAction;
  } = {
    efxToUsdt: {
      account: "effecttokens",
      name: "transfer",
      authorization,
      data: {
        from: actor,
        to: "swap.defi",
        quantity: Asset.from(amount, "4,EFX"),
        memo: `swap,${valueAmount},${swapDirection.EfxToUsdt}`,
      },
    },
    usdtToEfx: {
      account: "tethertether",
      name: "transfer",
      authorization,
      data: {
        from: actor,
        to: "swap.defi",
        quantity: Asset.from(amount, "4,USDT"),
        memo: `swap,${valueAmount},${swapDirection.UsdtToEfx}`,
      },
    },
  };

  return swapAction[direction];
};

export const swap = async (
  client: Client,
  amount: number,
  direction: swapDirection,
) => {
  try {
    if (!client.session) {
      throw new Error("Session is required for this method.");
    }

    const { transact, actor, authorization } = client.session;
    const efxPrice = await getPrice();

    const action = buildSwapAction(
      direction,
      actor,
      authorization,
      amount,
      efxPrice,
    );

    return await transact({ action });
  } catch (e) {
    console.error(e);
    throw new Error("Error swapping tokens");
  }
};
