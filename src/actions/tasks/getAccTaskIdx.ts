import type { Client } from "../../client";
import { createCompositeU64Key } from "../../utils/keys";
import { useEFXContracts } from "../../utils/state";

export type GetAccTaskIdxArgs = {
  client: Client;
  accountId: number;
  campaignId: number;
};

export const getAccTaskIdx = async ({
  client,
  accountId,
  campaignId,
}: GetAccTaskIdxArgs) => {
  try {
    const { tasks } = useEFXContracts(client);
    const { provider } = client;

    const compositeKey = createCompositeU64Key(campaignId, accountId);

    const response = await provider.v1.chain.get_table_rows({
      code: tasks,
      table: "acctaskidx",
      lower_bound: compositeKey,
      upper_bound: compositeKey,
    });

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
