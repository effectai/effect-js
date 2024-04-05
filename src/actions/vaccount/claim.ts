import { AnyAction, Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { getForceSettings } from "../tasks/getForceSettings";
import { getPendingPayments } from "./getPendingPayout";
import { useEFXContracts } from "../../utils/state";
import { VAccountError } from "../../errors";
import { Payment } from "../../exports";

/* Claims pending amount to vAccount */

export const claim = async (client: Client) => {
  if (!client.session?.vAccount) {
    throw new VAccountError("vAccount is not set.");
  }

  const { tasks } = useEFXContracts(client);
  const { authorization } = client.session;

  const { claimablePayments } = await getPendingPayments(
    client,
    client.session.vAccount.id,
  );

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

export const claimActions = ({
  payments,
  tasks,
  authorization,
}: {
  payments: Payment[];
  tasks: string;
  authorization: { actor: Name; permission: Name }[];
}): AnyAction[] => {
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
