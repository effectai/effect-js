import { UInt64Type } from "@wharfkit/antelope";
import type { Client, Submission } from "../../exports";
import { GetTableRowsResponse } from "../../types/helpers";
import { useEFXContracts } from "../../utils/state";

export const getSubmissions = async ({
  client,
  reverse = false,
}: {
  client: Client;
  reverse?: boolean;
}) => {
  try {
    const { provider } = client;
    const { tasks } = useEFXContracts(client);

    const data = (await provider.v1.chain.get_table_rows({
      code: tasks,
      table: "submission",
      json: true,
      reverse,
    })) as GetTableRowsResponse<UInt64Type, Submission>;

    return data;
  } catch (e) {
    console.error("Error while fetching tasks:", e);
    throw new Error("Failed to fetch tasks");
  }
};
