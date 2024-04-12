import type { Client } from "../../../client";
import { SessionNotFoundError } from "../../../errors";
import type { InitCampaign } from "../../../types/campaign";
import { useEFXContracts } from "../../../utils/state";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";

export const createCampaign = async (
  client: Client,
  campaign: InitCampaign
) => {
  if (!client.session) {
    throw new SessionNotFoundError("Session is required for this method.");
  }

  const { transact, actor, authorization } = client.session;
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
