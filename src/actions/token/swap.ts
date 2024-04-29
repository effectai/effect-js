import { type AnyAction, Asset, type Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { DefiBoxPairEnum } from "./getDefiBoxPair";
import { getPrice } from "./getPrice";
import type { TransactResult } from "@wharfkit/session";

export enum swapDirectionEnum {
  EfxToUsdt = "efxToUsdt",
  UsdtToEfx = "usdtToEfx",
}

export const swapDirection = {
  EfxToUsdt: `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
  UsdtToEfx: `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`,
};

export type BuildSwapActionArgs = {
  direction: swapDirectionEnum;
  actor: Name;
  authorization: { permission: Name; actor: Name }[];
  amount: number;
  efxPrice: number;
};

export const buildSwapAction = ({
  direction,
  actor,
  authorization,
  amount,
  efxPrice,
}: BuildSwapActionArgs): AnyAction => {
  if (!authorization || !authorization.length || !actor) {
    throw new Error("No authorization provided");
  }

  if (!amount || !efxPrice) {
    throw new Error("Amount or EFX price not provided");
  }

  const valueAmount = efxPrice * amount;

  const swapAction: { [key: string]: AnyAction } = {
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

export type SwapArgs = {
  client: Client;
  amount: number;
  direction: swapDirectionEnum;
};

export const swap = async ({
  client,
  amount,
  direction,
}: SwapArgs): Promise<TransactResult> => {
  if (!client.session) {
    throw new Error("Swap: Session is required for this method.");
  }
  try {
    const { transact, actor, authorization } = client.session;
    const efxPrice = await getPrice();

    const action = buildSwapAction({
      direction,
      actor,
      authorization,
      amount,
      efxPrice,
    });

    return await transact({ action });
  } catch (e) {
    throw new Error(`Error swapping tokens\n${e}`);
  }
};
