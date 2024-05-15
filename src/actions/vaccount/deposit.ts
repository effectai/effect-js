import { type AnyAction, Asset } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";
import { useEFXContracts } from "../../utils/state";

export type DepositActionArgs = {
	client: Client;
	amount: number;
	vAccountId: number;
};

export const depositAction = ({
	client,
	amount,
	vAccountId,
}: DepositActionArgs): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, authorization } = client.session;
	const { token, vaccount } = useEFXContracts(client);

	if (!vAccountId) {
		throw new Error("No vAccount ID provided.");
	}

	return {
		account: token,
		name: "transfer",
		authorization,
		data: {
			from: actor,
			to: vaccount,
			quantity: Asset.from(amount, "4,EFX"),
			memo: `${vAccountId}`,
		},
	};
};

export type DepositArgs = {
	client: Client;
	vAccountId: number;
	amount: number;
};

export const deposit = async ({ client, vAccountId, amount }: DepositArgs) => {
	try {
		if (!client.session) {
			throw new SessionNotFoundError("Session is required for this method.");
		}

		const { transact } = client.session;

		return await transact({
			action: depositAction({ client, vAccountId, amount }),
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error depositing EFX");
	}
};
