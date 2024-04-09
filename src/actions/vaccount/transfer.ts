import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";

export const vTransfer = async (
  client: Client,
  from_id: string,
  to_id: string,
  quantity: string,
) => {
  if (!client.session) {
    throw new SessionNotFoundError("Session is required for this method.");
  }
  const { transact, permissionLevel, actor } = client.session;
  const { contracts } = client.network.config.efx;

  const transferAction = {
    account: contracts.vaccount,
    name: "vtransfer",
    authorization: [permissionLevel],
    data: {
      from_id: from_id,
      to_id: to_id,
      quantity: {
        quantity: quantity,
        contract: contracts.token,
      },
      memo: "",
      payer: actor,
      sig: null,
      fee: null,
    },
  };
  return await transact({ action: transferAction });
};
