import { Name } from "@wharfkit/session";
import type { Client } from "../../client";
import { VAddress } from "../../utils/variants";
import { ExtendedSymbol } from "../../utils/structs";

export const createVAccount = async (client: Client, _account?: Name) => {
  if (!client.session) {
    throw new Error("Session is required for this method.");
  }

  // If no account is provided, use the current session actor
  const account = _account ?? client.session.actor;

  const { authorization, transact, actor } = client.session;
  const { contracts } = client.network.config.efx;

  const action = {
    account: contracts.vaccount,
    name: "open",
    authorization,
    data: {
      acc: VAddress.from(Name.from(account.toString())),
      symbol: new ExtendedSymbol("4,EFX", contracts.token),
      payer: actor,
    },
  };

  return await transact({ action });
};
