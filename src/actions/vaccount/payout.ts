import { type AnyAction, ExtendedAsset, type Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { VAccountError } from "../../errors";
import { useEFXContracts } from "../../utils/state";
import { claimActions } from "./claim";
import { getPendingPayments } from "./getPendingPayments";
import { withdrawAction } from "./withdraw";

/* claim & withdraw EFX to VAccount */
export type PayoutArgs = {
	client: Client;
	actor: Name;
};

export const payout = async ({ client, actor }: PayoutArgs) => {
	if (!client.session?.vAccount) {
		throw new VAccountError("vAccount is not set.");
	}

	const { tasks, vaccount, token } = useEFXContracts(client);
	const { authorization } = client.session;

	const { claimablePayments, totalEfxClaimable } = await getPendingPayments({
		client,
		vAccountId: client.session.vAccount.id,
	});

	if (!claimablePayments.length) {
		throw new Error("No payouts currently claimable.");
	}

	const actions = <AnyAction[]>[];

	if (claimablePayments) {
		actions.push(
			...claimActions({
				payments: claimablePayments,
				tasks,
				authorization,
			}),
		);
	} else {
		throw new Error("No pending payouts found");
	}

	// Withdraw it to the vAccount
	actions.push(
		withdrawAction({
			account: vaccount,
			from_id: client.session.vAccount.id,
			to_account: actor,
			authorization,
			quantity: ExtendedAsset.from({
				contract: token,
				quantity: `${totalEfxClaimable.toFixed(4)} EFX`,
			}),
			memo: "",
		}),
	);

	const { transact } = client.session;
	return await transact({ actions: actions });
};
