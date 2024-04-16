import type { AnyAction, Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { VAccountError } from "../../errors";
import type { Payment } from "../../exports";
import { useEFXContracts } from "../../utils/state";
import { getPendingPayments } from "./getPendingPayments";

/* Claims pending amount to vAccount */

export type ClaimArgs = {
	client: Client;
};

export const claim = async ({ client }: ClaimArgs) => {
	if (!client.session?.vAccount) {
		throw new VAccountError("vAccount is not set.");
	}

	const { tasks } = useEFXContracts(client);
	const { authorization } = client.session;

	const { claimablePayments } = await getPendingPayments({
		client,
		vAccountId: client.session.vAccount.id,
	});

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

	const { transact } = client.session;
	return await transact({ actions: actions });
};

export type ClaimActionsArgs = {
	payments: Payment[];
	tasks: string;
	authorization: { actor: Name; permission: Name }[];
};

export const claimActions = ({
	payments,
	tasks,
	authorization,
}: ClaimActionsArgs): AnyAction[] => {
	const actions = <AnyAction[]>[];

	for (const payment of payments) {
		actions.push({
			account: tasks,
			name: "payout",
			authorization,
			data: {
				payment_id: payment.id,
			},
		});
	}

	return actions;
};
