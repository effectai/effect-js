import { Client } from "../../client";
import { useEFXContracts } from "../../utils";

/**
 * Retrieve the avatar for the given account
 * @param account
 * @returns
 * @example { type: 0, asset_id: '2199025109172' }
 */
export const getAvatar = async (client: Client, account: string) => {
  const { dao } = useEFXContracts(client);
  const { provider } = client;

  const response = await provider.v1.chain.get_table_rows({
    code: dao,
    scope: account,
    table: "avatar",
    limit: 1,
  });

  const [avatar] = response.rows;
  return avatar;
};
