import { UInt128, UInt64 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { GetTableRowsResponse } from "../../types/helpers";
import { Payment } from "../../types/user";
import { ForceSettings, getForceSettings } from "../tasks/getForceSettings";

export const isClaimable = (p: Payment, forceSettings: ForceSettings) => {
  return (
    new Date(new Date(p.last_submission_time) + "UTC").getTime() / 1000 +
      forceSettings.payout_delay_sec <
    Date.now() / 1000
  );
};

export const getPendingPayments = async (
  client: Client,
  vAccountId: number,
) => {
  const { network, provider } = client;
  const { contracts } = network.config.efx;

  const data = (await provider.v1.chain.get_table_rows({
    code: contracts.tasks,
    scope: contracts.tasks,
    table: "payment",
    index_position: "tertiary",
    key_type: "i64",
    lower_bound: UInt128.from(vAccountId),
    upper_bound: UInt128.from(vAccountId),
  })) as GetTableRowsResponse<UInt64, Payment>;

  const forceSettings = await getForceSettings(client);

  const claimablePayments = data.rows.filter((p) =>
    isClaimable(p, forceSettings),
  );

  console.log(claimablePayments);

  return {
    pendingPayments: data.rows,
    claimablePayments,
  };
};
