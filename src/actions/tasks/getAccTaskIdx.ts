import { UInt32, type UInt64 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { createCompositeU64Key } from "../../utils/keys";
import { useEFXContracts } from "../../utils/state";
import type { Acctaskidx } from "../../@generated/types/effecttasks2";
import type { GetTableRowsResponse, Serialized } from "../../exports";

export type GetAccTaskIdxArgs = {
  client: Client;
  accountId: number;
  campaignId?: number;
};

export const getAccTaskIdx = async ({
  client,
  accountId,
  campaignId,
}: GetAccTaskIdxArgs) => {
  try {
    const { tasks } = useEFXContracts(client);
    const { provider } = client;

    const lowerBound = createCompositeU64Key(campaignId || 0, accountId);
    const upperBound = createCompositeU64Key(
      campaignId || Number(UInt32.max),
      accountId
    );

    const { rows } = (await provider.v1.chain.get_table_rows({
      code: tasks,
      table: "acctaskidx",
      lower_bound: lowerBound,
      upper_bound: upperBound,
    })) as GetTableRowsResponse<UInt64, Serialized<Acctaskidx>>;

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
