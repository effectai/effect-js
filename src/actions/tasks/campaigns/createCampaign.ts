import type { Client } from "../../../client";
import type { InitCampaign } from "../../../types/campaign";
import { useEFXContracts } from "../../../utils";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import { useWharfKitSession } from "../../../utils/session";

export const createCampaign = async (
  client: Client,
  campaign: InitCampaign,
) => {
  const { transact, actor, authorization } = useWharfKitSession(client);
  const { tasks, token } = useEFXContracts(client);

  try {
    const hash = await uploadIpfsResource(client, campaign.info);

    const response = await transact({
      action: {
        account: tasks,
        name: "mkcampaign",
        authorization,
        data: {
          owner: actor,
          content: { field_0: 0, field_1: hash },
          max_task_time: campaign.max_task_time,
          reward: {
            quantity: campaign.quantity,
            contract: token,
          },
          qualis: campaign.qualis ?? [],
          payer: actor,
        },
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
