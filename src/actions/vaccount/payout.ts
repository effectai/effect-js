import { AnyAction, Name } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { getForceSettings } from "../tasks/getForceSettings";
import { getPendingPayments } from "./getPendingPayout";
import { useEFXContracts } from "../../utils/state";
import { VAccountError } from "../../errors";

export const payout = async (client: Client, actor: Name, permission: Name) => {
  if (!client.session?.vAccount) {
    throw new VAccountError("vAccount is not set.");
  }

  const { tasks } = useEFXContracts(client);
  const forceSettings = await getForceSettings(client);

  const payments = await getPendingPayments(client, client.session.vAccount.id);

  const actions = <AnyAction[]>[];

  if (payments) {
    for (const payment of payments.rows) {
      // payout is only possible after x amount of days have passed since the last_submission_time
      if (
        new Date(new Date(payment.last_submission_time) + "UTC").getTime() /
          1000 +
          forceSettings.payout_delay_sec <
        Date.now() / 1000
      ) {
        actions.push({
          account: tasks,
          name: "payout",
          authorization: [
            {
              actor,
              permission,
            },
          ],
          data: {
            payment_id: payment.id,
          },
        });
      }
    }
  } else {
    throw new Error("No pending payouts found");
  }

  const { transact } = client.session;
  return await transact({ actions: actions });
};
