import {
	Asset,
	ExtendedAsset,
	type AnyAction,
	type ExtendedAssetType,
	type NameType,
} from "@wharfkit/antelope";
import type { Client } from "../../exports";

export type WithdrawArgs = {
	client: Client;
	quantity: number;
};

export const withdraw = async ({ client, quantity }: WithdrawArgs) => {
	if (!client.session?.vAccount) {
		throw new Error("vAccount is not set.");
	}

	const { transact, actor, authorization } = client.session;
	const { contracts } = client.network.config.efx;
	const quantityAsset = ExtendedAsset.from({
		quantity: Asset.from(quantity, "EFX"),
		contract: contracts.token,
	});

	const action = withdrawAction({
		from_id: client.session.vAccount.id,
		to_account: actor,
		quantity: quantityAsset,
		account: contracts.vaccount,
		authorization,
		memo: "",
	});

	return await transact({ action });
};

export type WithdrawActionArgs = {
	from_id: number;
	to_account: NameType;
	quantity: ExtendedAssetType;
	account: string;
	authorization: { actor: NameType; permission: NameType }[];
	memo: string;
};

export const withdrawAction = ({
	from_id,
	to_account,
	quantity,
	account,
	authorization,
}: WithdrawActionArgs): AnyAction => {
	return {
		account,
		name: "withdraw",
		authorization,
		data: {
			from_id,
			to_account,
			quantity,
			memo: "",
		},
	};
};
