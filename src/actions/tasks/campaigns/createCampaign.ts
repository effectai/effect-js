import type { AnyAction } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { SessionNotFoundError } from "../../../errors";
import { useEFXContracts } from "../../../utils/state";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import type { CampaignInfo } from "./getCampaigns";
import type { Mkcampaign, Quali } from "../../../@generated/types/effecttasks2";

export type CreateCampaignActionArgs = {
	client: Client;
	campaign: Mkcampaign;
};

export const createCampaignAction = ({
	client,
	campaign,
}: CreateCampaignActionArgs): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor } = client.session;
	const { tasks } = useEFXContracts(client);

	return {
		account: tasks,
		name: "mkcampaign",
		authorization: [
			{
				actor,
				permission: "active",
			},
		],
		data: campaign,
	};
};

export type CreateCampaignArgs = {
	client: Client;
	campaign: CampaignInfo;
	reward: number;
	maxTaskTime: number;
	qualitications?: Quali[];
};

export const createCampaign = async ({
	client,
	campaign,
	reward,
	maxTaskTime,
	qualitications,
}: CreateCampaignArgs) => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { transact } = client.session;
	const { token } = useEFXContracts(client);

	try {
		// Upload Campaign data to IPFS
		const hash = await uploadIpfsResource({ client, data: campaign });

		const response = await transact({
			action: createCampaignAction({
				client,
				campaign: {
					max_task_time: maxTaskTime,
					reward: {
						quantity: `${reward.toFixed(4)} EFX`, // `1.0000 EFX`
						contract: token,
					},
					payer: client.session.actor.toString(),
					content: { field_0: maxTaskTime, field_1: hash },
					qualis: qualitications ?? [],
					owner: ["name", client.session.actor.toString()],
				},
			}),
		});

		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
