import { Asset } from "@wharfkit/antelope";
import { Client } from "../../client";
import { useEFXContracts } from "../../utils";
import { useSession } from "../session";

export const deposit = async (
  client: Client,
  vaccountId: number,
  amount: number,
) => {
  try {
    const { transact, actor, authorization } = useSession(client);
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
