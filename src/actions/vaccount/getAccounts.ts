import { Name } from "@wharfkit/antelope";
import { Client } from "../../client";
import { VAccount } from "../../types";
import { generateCheckSumForVAccount } from "../../utils";

export const getVAccounts = async (
  client: Client,
  actor: Name,
): Promise<VAccount[]> => {
  const { provider, network } = client;
  const { contracts } = network.config.efx;

  const keycs = generateCheckSumForVAccount(actor, contracts.token);

  const response = await provider.v1.chain.get_table_rows({
    code: contracts.vaccount,
    table: "account",
    scope: contracts.vaccount,
    upper_bound: keycs,
    lower_bound: keycs,
    index_position: "secondary",
    key_type: "sha256",
  });

  return response.rows;
};
