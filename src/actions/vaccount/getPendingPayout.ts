import { UInt128, UInt64 } from "@wharfkit/antelope";
import { Client } from "../../client";
import { GetTableRowsResponse } from "../../types/helpers";
import { Payment } from "../../types/user";

export const getPendingPayments = async (
  client: Client,
  vAccountId: number,
) => {
  const { network, provider } = client;
  const { contracts } = network.config.efx;

  return (await provider.v1.chain.get_table_rows({
    code: contracts.tasks,
    scope: contracts.tasks,
    table: "payment",
    index_position: "tertiary",
    key_type: "i64",
    lower_bound: UInt128.from(vAccountId),
    upper_bound: UInt128.from(vAccountId),
  })) as GetTableRowsResponse<UInt64, Payment>;
};
