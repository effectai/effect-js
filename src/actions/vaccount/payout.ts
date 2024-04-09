import { AnyAction, ExtendedAsset, Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { getPendingPayments } from "./getPendingPayout";
import { useEFXContracts } from "../../utils/state";
import { VAccountError } from "../../errors";
import { claimActions } from "./claim";
import { withdrawAction } from "./withdraw";

/* claim & withdraw EFX to VAccount */
export const payout = async (client: Client, actor: Name) => {
  if (!client.session?.vAccount) {
    throw new VAccountError("vAccount is not set.");
  }

  const { tasks, vaccount, token } = useEFXContracts(client);
  const { authorization } = client.session;

  const { claimablePayments } = await getPendingPayments(
    client,
    client.session.vAccount.id,
  );

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

  const totalEfxPending =
    claimablePayments.reduce(
      (acc, p) =>
        acc + parseFloat(p.pending.quantity.match(/[0-9.]+/)?.[0] || "0") || 0,
      0,
    ) || 0;

  // Withdraw it to the vAccount
  actions.push(
    withdrawAction({
      account: vaccount,
      from_id: client.session.vAccount.id,
      to_account: actor,
      authorization,
      quantity: ExtendedAsset.from({
        contract: token,
        quantity: `${totalEfxPending.toFixed(4)} EFX`,
      }),
      memo: "",
    }),
  );

  const { transact } = client.session;
  return await transact({ actions: actions });
};
