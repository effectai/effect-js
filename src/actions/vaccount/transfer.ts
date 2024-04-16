import type { AnyAction } from "@wharfkit/antelope";
import type { Client } from "../../client";
import type { ForceSettings } from "../tasks/getForceSettings";
import { SessionNotFoundError } from "../../errors";
import { useEFXContracts } from "../../utils/state";

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
				quantity: quantity,
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
	from_id: number;
	to_id: number;
	quantity: number;
};

export const vTransfer = async ({
	client,
	from_id,
	to_id,
	quantity,
}: vTransferArgs) => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}
	const { transact } = client.session;

	const transferAction = vTransferAction({
		client,
		to_id,
		from_id,
		quantity,
	});

	return await transact({ action: transferAction });
};
