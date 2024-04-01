import { Client } from "../../client";
import { Reservation } from "../../types";
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
      throw new Error(
        `Task data retrieved from IPFS is not an array. \n${String(ipfsData)}`,
      );
    }

    // Check if there is a task at the index
    if (ipfsData.length <= taskIndex || taskIndex < 0) {
      throw new Error(
        `Task data retrieved from IPFS does not have a task at index ${taskIndex}. \n${JSON.stringify(ipfsData)}`,
      );
    }

    return ipfsData[taskIndex];
  } catch (error) {
    console.error("Error while fetching task data:", error);
    throw new Error("Error while fetching task data.");
  }
};

export const getTaskDataByReservation = (
  client: Client,
  reservation: Reservation,
) => {
  return getTaskData(client, reservation.task_idx, reservation.batch_id);
};
