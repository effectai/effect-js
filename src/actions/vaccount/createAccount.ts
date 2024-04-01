import { Name } from "@wharfkit/session";
import { Client } from "../../client";
import { VAddress } from "../../constants/variants";
import { ExtendedSymbol } from "../../constants/structs";
import { useSession } from "../session";

export const createVAccount = async (client: Client) => {
  if (!client.session) {
    throw new Error("Session is required for this method.");
  }

  const { actor, authorization, transact } = useSession(client);
  const { contracts } = client.network.config.efx;

  const action = {
    account: contracts.vaccount,
    name: "open",
    authorization,
    data: {
      acc: VAddress.from(Name.from(actor.toString())),
      symbol: new ExtendedSymbol("4,EFX", contracts.token),
      payer: actor,
    },
  };

  return await transact({ action });
};
