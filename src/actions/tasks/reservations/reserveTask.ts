import { Client } from "../../../client";
import { useEFXContracts } from "../../../utils";
import { useWharfKitSession } from "../../session";
import { getReservationForCampaign } from "./getReservations";

export const reserveTask = async (
  client: Client,
  campaignId: number,
  qualificationAssets?: string[],
) => {
  const { authorization, actor, transact } = useWharfKitSession(client);
  const { tasks: taskContract } = useEFXContracts(client);
  const { vAccount } = client;

  if (!vAccount || !vAccount.id) {
    throw new Error("No vAccountId found");
  }

  // Check if the user already has a reservation for this campaign
  const existingReservation = await getReservationForCampaign(
    client,
    campaignId,
    vAccount.id,
  );

  // If there's already a reservation, return it
  if (existingReservation) {
    return existingReservation;
  }

  try {
    await transact({
      action: {
        account: taskContract,
        name: "reservetask",
        authorization,
        data: {
          campaign_id: campaignId,
          account_id: vAccount.id,
          quali_assets: qualificationAssets,
          payer: actor,
          sig: null,
        },
      },
    });

    return await getReservationForCampaign(client, campaignId, vAccount.id);
  } catch (error) {
    console.error("Error while reserving task:", error);
    return null;
  }
};
