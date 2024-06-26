import { Asset, type AnyAction } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";
import { useEFXContracts } from "../../utils/state";
import type { TransactResult } from "@wharfkit/session";
import { getVAccounts } from "./getAccounts";

export type vTransferActionArgs = {
	client: Client;
	from_id: number;
	to_id: number;
	quantity: number;
};

export const vTransferAction = ({
	client,
	to_id,
	from_id,
	quantity,
}: vTransferActionArgs): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, authorization } = client.session;
	const { vaccount, token } = useEFXContracts(client);

	return {
		account: vaccount,
		name: "vtransfer",
		authorization,
		data: {
			from_id,
			to_id,
			quantity: {
				quantity: Asset.from(quantity, "4,EFX"),
				contract: token,
			},
			memo: "",
			payer: actor,
			sig: null,
			fee: null,
		},
	};
};

export type vTransferArgs = {
	client: Client;
	from_id?: number; // from_id is optional, if sesion is connected, sending from actor is possible.
	to_id: number;
	quantity: number;
};

export const vTransfer = async ({
	client,
	from_id,
	to_id,
	quantity,
}: vTransferArgs): Promise<TransactResult> => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}
	const { transact, actor } = client.session;

	const [vaccount] = await getVAccounts({ client, actor });

	const transferAction = vTransferAction({
		client,
		to_id,
		from_id: from_id ?? vaccount.id,
		quantity,
	});

	return await transact({ action: transferAction });
};
