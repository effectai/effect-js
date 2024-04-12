import { UInt32 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { useEFXContracts } from "../../utils/state";
import type { Reservation } from "../../types/campaign";
import { uploadIpfsResource } from "../ipfs/uploadIpfsResource";
import { SessionNotFoundError } from "../../errors";

//TODO:: make task data strongly typed.

export const submitTask = async (
  client: Client,
  reservation: Reservation,
  data: unknown
) => {
  try {
    if (!client.session) {
      throw new SessionNotFoundError("Session is required for this method.");
    }

    const { authorization, transact, actor } = client.session;
    const { tasks } = useEFXContracts(client);

    const ipfsData = await uploadIpfsResource(client, data);

    const response = await transact({
      action: {
        account: tasks,
        name: "submittask",
        authorization,
        data: {
          campaign_id: UInt32.from(reservation.campaign_id),
          account_id: UInt32.from(reservation.account_id),
          task_idx: UInt32.from(reservation.task_idx),
          data: ipfsData,
          payer: actor,
          sig: null,
        },
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
