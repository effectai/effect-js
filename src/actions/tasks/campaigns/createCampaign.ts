import type {
	Content,
	Mkcampaign,
} from "../../../@generated/types/effecttasks2";
import type { Client } from "../../../client";
import { SessionNotFoundError } from "../../../errors";
import { useEFXContracts } from "../../../utils/state";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import type { CampaignInfo } from "./getCampaigns";

export type CreateCampaignArgs = {
	client: Client;
	campaign: Omit<Mkcampaign, "content">;
	data: CampaignInfo;
};

export const createCampaign = async ({
	client,
	campaign,
	data,
}: CreateCampaignArgs) => {
	if (!data) {
		throw new Error("Data is required for this method.");
	}

	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { transact, actor, authorization } = client.session;
	const { tasks, token } = useEFXContracts(client);

	try {
		// Upload Campaign data to IPFS
		const hash = await uploadIpfsResource({ client, data });

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
						quantity: campaign.reward.quantity,
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
