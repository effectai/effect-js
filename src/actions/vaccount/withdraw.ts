import { ExtendedAsset } from "@wharfkit/antelope";
import { Client } from "../../exports";

export const withdraw = async (client: Client, quantity: ExtendedAsset) => {
  if (!client.session?.vAccount) {
    throw new Error("vAccount is not set.");
  }

  const { transact, actor, authorization } = client.session;
  const { contracts } = client.network.config.efx;

  const withdrawAction = {
    account: contracts.vaccount,
    name: "withdraw",
    authorization,
    data: {
      from_id: client.session.vAccount.id,
      to_account: actor,
      quantity,
    },
  };

  return await transact({ action: withdrawAction });
};
