import type { Client } from "../../client";
import type { Reservation } from "../../types/campaign";

import { TaskIpfsError } from "../../errors";
import { getIpfsResource } from "../ipfs/getIpfsResource";
import { getBatch } from "./batch/getBatch";

export const getTaskData = async (
  client: Client,
  taskIndex: number,
  batchId: number,
) => {
  try {
    const batch = await getBatch(client, batchId);
    const ipfsData = await getIpfsResource(client, batch.content.field_1);
    // check if the ipfsData is an array
    if (!Array.isArray(ipfsData)) {
      throw new TaskIpfsError(
        `Task data retrieved from IPFS is not an array. \n${String(ipfsData)}`,
      );
    }

    // Check if there is a task at the index
    if (ipfsData.length <= taskIndex || taskIndex < 0) {
      throw new TaskIpfsError(
        `Task data retrieved from IPFS does not have a task at index ${taskIndex}. \n${JSON.stringify(ipfsData)}`,
      );
    }

    console.log(ipfsData[taskIndex]);

    return ipfsData[taskIndex];
  } catch (error: unknown | TaskIpfsError) {
    console.error("Error while fetching task data:", error);
    throw error;
  }
};

export const getTaskDataByReservation = (
  client: Client,
  reservation: Reservation,
) => {
  return getTaskData(client, reservation.task_idx, reservation.batch_id);
};
