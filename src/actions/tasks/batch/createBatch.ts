import { AnyAction, Asset } from "@wharfkit/antelope";
import { Client } from "../../../client";
import { InitBatch } from "../../../types/campaign";
import { useSession } from "../../session";
import { getCampaign } from "../campaigns/getCampaigns";
import { useEFXContracts, validateBatchData } from "../../../utils";
import { uploadIpfsResource } from "../../ipfs/uploadIpfsResource";
import { ForceSettings, getForceSettings } from "../getForceSettings";
import { VAccount } from "../../../types";

const depositAction = (
  client: Client,
  amount: number,
  vAccount: VAccount,
): AnyAction => {
  const { actor, authorization } = useSession(client);
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
  const { actor, permission } = useSession(client);
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
  const { actor, authorization } = useSession(client);
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
  const { authorization } = useSession(client);
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
    const forceSettings = await getForceSettings(client);
    const { transact } = useSession(client);

    const { vAccount } = client.state.getState();

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
    if (campaign.info?.input_schema) {
      validateBatchData(batch, campaign);
    }

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
