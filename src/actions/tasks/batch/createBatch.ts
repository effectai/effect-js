import { type AnyAction, Asset } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { SessionNotFoundError } from "../../../errors";
import { useEFXContracts } from "../../../utils/state";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import { getForceSettings } from "../getForceSettings";
import { getCampaignById } from "../campaigns/getCampaignById";
import { depositAction } from "../../vaccount/deposit";
import { vTransferAction } from "../../vaccount/transfer";
import type { Mkbatch, Settings } from "../../../@generated/types/tasks.efx";

export type CreateBatchActionArgs = {
	client: Client;
	forceSettings: Settings;
	batch: Mkbatch;
	hash: string;
};

export const createBatchAction = ({
	client,
	forceSettings,
	batch,
	hash,
}: CreateBatchActionArgs): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, permission } = client.session;
	const { tasks } = useEFXContracts(client);

	return {
		account: tasks,
		name: "mkbatch",
		authorization: [
			{
				actor,
				permission,
			},
		],
		data: {
			id: forceSettings.force_vaccount_id,
			campaign_id: batch.campaign_id,
			content: { field_0: 0, field_1: hash },
			repetitions: batch.repetitions,
			payer: actor,
			sig: null,
		},
	};
};

export type PublishBatchActionArgs = {
	client: Client;
	batchId: number;
	numTasks: number;
};

export const publishBatchAction = ({
	client,
	batchId,
	numTasks,
}: PublishBatchActionArgs): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { authorization } = client.session;
	const { tasks } = useEFXContracts(client);

	return {
		account: tasks,
		name: "publishbatch",
		authorization,
		data: {
			batch_id: batchId,
			num_tasks: numTasks,
			sig: null,
		},
	};
};

export type CreateBatchArgs = {
	client: Client;
	campaignId: number;
	repetitions: number;
	reward: number;
	taskData: Record<string, unknown>[];
};

export const createBatch = async ({
	client,
	campaignId,
	repetitions,
	reward,
	taskData,
}: CreateBatchArgs) => {
	try {
		if (!client.session) {
			throw new SessionNotFoundError("Session is required for this method.");
		}

		const forceSettings = await getForceSettings({ client });
		const { transact, vAccount, actor } = client.session;

		if (!vAccount) {
			throw new Error("vAccount not found");
		}

		const campaign = await getCampaignById({ client, id: campaignId });
		const assetQuantity = Asset.from(reward, "4,EFX");
		const batchPrice = assetQuantity.value * repetitions;

		// Check if the user has enough funds to pay for the batch
		// if (Asset.from(vacc.balance.quantity).value < batchPrice) {
		//     throw new Error('Not enough funds in vAccount to pay for batch')
		// }

		// Validate the batch before uploading, will throw error
		// TODO::
		// if (campaign.info?.input_schema) {
		// 	validateBatchData(batch, campaign);
		// }

		const newBatchId = campaign.num_batches + 1;
		const hash = await uploadIpfsResource({ client, data: taskData });

		const makeBatch = createBatchAction({
			client,
			forceSettings,
			batch: {
				id: newBatchId,
				payer: actor.toString(),
				campaign_id: campaignId,
				repetitions,
				content: { field_0: 0, field_1: hash },
			},
			hash,
		});

		const vTransfer = vTransferAction({
			client,
			from_id: vAccount.id,
			to_id: forceSettings.force_vaccount_id,
			quantity: batchPrice,
		});

		const publishBatch = publishBatchAction({
			client,
			batchId: newBatchId,
			numTasks: repetitions,
		});

		// TODO Check if batchId is correct.
		let actions: AnyAction[];

		if (Asset.from(vAccount.balance.quantity).value < batchPrice) {
			const deposit = depositAction({
				client,
				amount: assetQuantity.value,
				vAccountId: vAccount.id,
			});
			actions = [deposit, makeBatch, vTransfer, publishBatch];
		} else {
			actions = [makeBatch, vTransfer, publishBatch];
		}

		const response = await transact({ actions });
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
