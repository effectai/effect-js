import { Name, Session } from "@wharfkit/session";
import type { Client } from "../../client";
import { VAddress } from "../../utils/variants";
import { ExtendedSymbol } from "../../utils/structs";

export const createVAccount = async ({
  client,
  session,
  account,
}: {
  client: Client;
  session?: Session;
  account?: Name;
}) => {
  const sessionToUse = session ?? client.session;

  if (!sessionToUse) {
    throw new Error("No session provided");
  }

  // If no account is provided, use the current session actor
  const acc = account ?? sessionToUse.actor;

  const { actor } = sessionToUse;
  const { contracts } = client.network.config.efx;

  const authorization = [
    {
      actor,
      permission: sessionToUse.permission,
    },
  ];

  const action = {
    account: contracts.vaccount,
    name: "open",
    authorization,
    data: {
      acc: VAddress.from(Name.from(acc.toString())),
      symbol: new ExtendedSymbol("4,EFX", contracts.token),
      payer: actor,
    },
  };

  return await sessionToUse.transact({ action });
};
