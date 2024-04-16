import type { AnyAction, ExtendedAsset, Name } from "@wharfkit/antelope";
import type { Client } from "../../exports";

export type WithdrawArgs = {
	client: Client;
	quantity: ExtendedAsset;
};

export const withdraw = async ({ client, quantity }: WithdrawArgs) => {
	if (!client.session?.vAccount) {
		throw new Error("vAccount is not set.");
	}

	const { transact, actor, authorization } = client.session;
	const { contracts } = client.network.config.efx;

	const action = withdrawAction({
		from_id: client.session.vAccount.id,
		to_account: actor,
		quantity,
		account: contracts.vaccount,
		authorization,
		memo: "",
	});

	return await transact({ action });
};

export type WithdrawActionArgs = {
	from_id: number;
	to_account: Name;
	quantity: ExtendedAsset;
	account: string;
	authorization: { actor: Name; permission: Name }[];
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
