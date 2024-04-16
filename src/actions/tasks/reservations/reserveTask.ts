import type { Client } from "../../../client";
import { useEFXContracts } from "../../../utils/state";
import { getReservationForCampaign } from "./getReservations";

export const reserveTask = async (
	client: Client,
	campaignId: number,
	qualificationAssets?: string[],
) => {
	if (!client.session) {
		throw new Error("Session is required for this method.");
	}

	const { authorization, actor, transact } = client.session;
	const { tasks: taskContract } = useEFXContracts(client);
	const { vAccount } = client.session;

	if (!vAccount || !vAccount.id) {
		throw new Error("Vaccount is not set.");
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
