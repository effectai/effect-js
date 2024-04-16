import { type AnyAction, Asset } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { SessionNotFoundError } from "../../../errors";
import type { InitBatch } from "../../../types/campaign";
import type { VAccount } from "../../../types/user";
import { useEFXContracts } from "../../../utils/state";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import { getCampaign } from "../campaigns/getCampaigns";
import { type ForceSettings, getForceSettings } from "../getForceSettings";

const depositAction = (
	client: Client,
	amount: number,
	vAccount: VAccount,
): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, authorization } = client.session;
	const { token, vaccount } = useEFXContracts(client);

	if (!vAccount || !vAccount.id) {
		throw new Error("No vAccount found");
	}

	return {
		account: token,
		name: "transfer",
		authorization,
		data: {
			from: actor,
			to: vaccount,
			quantity: Asset.from(amount, "4,EFX"),
			memo: `${vAccount.id}`,
		},
	};
};

const createBatchAction = async (
	client: Client,
	forceSettings: ForceSettings,
	batch: InitBatch,
	hash: string,
): Promise<AnyAction> => {
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

const vTransferAction = (
	client: Client,
	forceSettings: ForceSettings,
	vAccountId: number,
	batchPrice: number,
): AnyAction => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, authorization } = client.session;
	const { vaccount, token } = useEFXContracts(client);

	return {
		account: vaccount,
		name: "vtransfer",
		authorization,
		data: {
			from_id: vAccountId,
			to_id: forceSettings.force_vaccount_id,
			quantity: {
				quantity: batchPrice,
				contract: token,
			},
			memo: "",
			payer: actor,
			sig: null,
			fee: null,
		},
	};
};

const publishBatchAction = (
	client: Client,
	batchId: number,
	numTasks: number,
): AnyAction => {
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

export const createBatch = async (client: Client, batch: InitBatch) => {
	try {
		if (!client.session) {
			throw new SessionNotFoundError("Session is required for this method.");
		}

		const forceSettings = await getForceSettings(client);
		const { transact, vAccount } = client.session;

		if (!vAccount) {
			throw new Error("No vAccountId found");
		}

		const campaign = await getCampaign(client, batch.campaign_id);
		const assetQuantity = Asset.from(campaign.reward.quantity);
		const batchPrice = assetQuantity.value * batch.repetitions;

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
		const hash = await uploadIpfsResource(client, batch.data);

		const makeBatch = await createBatchAction(
			client,
			forceSettings,
			batch,
			hash,
		);

		const vTransfer = vTransferAction(
			client,
			forceSettings,
			vAccount.id,
			batchPrice,
		);

		const publishBatch = publishBatchAction(
			client,
			newBatchId,
			batch.repetitions,
		);

		// TODO Check if batchId is correct.
		let actions: AnyAction[];

		if (Asset.from(vAccount.balance.quantity).value < batchPrice) {
			const deposit = depositAction(client, assetQuantity.value, vAccount);
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
