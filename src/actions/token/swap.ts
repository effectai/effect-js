import {
	type AnyAction,
	Asset,
	type Name,
	PermissionLevelType,
} from "@wharfkit/antelope";
import type { Client } from "../../client";
import { DefiBoxPairEnum } from "./getDefiBoxPair";
import { getPrice } from "./getPrice";

export const swapDirection = {
	EfxToUsdt: `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
	UsdtToEfx: `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`,
};

export const buildSwapAction = (
	direction: string,
	actor: Name,
	authorization: PermissionLevelType[],
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
		[swapDirection.EfxToUsdt]: {
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
		[swapDirection.UsdtToEfx]: {
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
	direction: string,
) => {
	try {
		if (!client.session) {
			throw new Error("Session is required for this method.");
		}

		const { transact, wharfKitSession, actor, authorization } = client.session;
		const efxPrice = await getPrice();

		const action = buildSwapAction(
			direction,
			actor,
			authorization,
			amount,
			efxPrice,
		);

		if (!action) {
			throw new Error("Invalid swap action");
		}

		return await transact({ action });
	} catch (e) {
		throw new Error(`Error swapping: ${e}`);
	}
};
