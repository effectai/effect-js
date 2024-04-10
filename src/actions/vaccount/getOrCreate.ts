import { Name } from "@wharfkit/antelope";
import { Client, createVAccount, getVAccounts } from "../../exports";
import { Session } from "@wharfkit/session";

export const getOrCreateVAccount = async ({
  client,
  actor,
  session,
}: {
  client: Client;
  actor: Name;
  session?: Session;
}) => {
  try {
    let [account] = await getVAccounts(client, actor);

    if (!account) {
      await createVAccount({ client, session, account: actor });

      [account] = await getVAccounts(client, actor);
    }

    return account;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get or create vAccount");
  }
};
