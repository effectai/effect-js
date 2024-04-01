import { AnyAction, Name } from "@wharfkit/antelope";
import { getVAccounts } from "./getAccounts";
import { Client } from "../../client";
import { getForceSettings } from "../tasks/getForceSettings";
import { getPendingPayments } from "./getPendingPayout";
import { useWharfKitSession } from "../session";
import { useEFXContracts } from "../../utils";

export const payout = async (client: Client, actor: Name, permission: Name) => {
  const vacc = await getVAccounts(client, actor);

  if (!vacc) {
    throw new Error("No vAccounts found");
  }

  const { tasks } = useEFXContracts(client);
  const forceSettings = await getForceSettings(client);

  //TODO:: what in case of multiple VAccounts ?
  const payments = await getPendingPayments(client, vacc[0].id);

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

  const { transact } = useWharfKitSession(client);
  return await transact({ actions: actions });
};
