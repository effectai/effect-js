import { AnyAction, Asset, Name } from "@wharfkit/antelope";
import { DefiBoxPairEnum } from "./getDefiBoxPair";
import { getPrice } from "./getPrice";
import { Client } from "../../client";
import { useWharfKitSession } from "../../utils/session";

export enum swapDirection {
  EfxToUsdt = `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
  UsdtToEfx = `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`,
}

export const buildSwapAction = (
  direction: swapDirection,
  actor: Name,
  authorization: { permission: Name; actor: Name }[],
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
    const { transact, actor, authorization } = useWharfKitSession(client);
    const efxPrice = await getPrice(client);

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
