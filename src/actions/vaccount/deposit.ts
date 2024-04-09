import { Asset } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { useEFXContracts } from "../../utils/state";
import { SessionNotFoundError } from "../../errors";

export const deposit = async (
  client: Client,
  vaccountId: number,
  amount: number,
) => {
  try {
    if (!client.session) {
      throw new SessionNotFoundError("Session is required for this method.");
    }

    const { transact, actor, authorization } = client.session;
    const { token, vaccount } = useEFXContracts(client);

    return await transact({
      action: {
        account: token,
        name: "transfer",
        authorization,
        data: {
          from: actor,
          to: vaccount,
          quantity: Asset.from(amount, "4,EFX"),
          memo: `${vaccountId}`,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error depositing EFX");
  }
};
