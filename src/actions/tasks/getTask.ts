import type { UInt32Type } from "@wharfkit/antelope";
import type { Client } from "../../client";

import { TaskIpfsError } from "../../errors";
import { getIpfsResource } from "../ipfs/getIpfsResource";
import { getBatchById } from "./batch/getBatch";
import type { Reservation } from "../../@generated/types/tasks.efx";

export type GetTaskDataArgs = {
	client: Client;
	taskIndex: number;
	batchId: number;
};

export const getTaskData = async ({
	client,
	taskIndex,
	batchId,
}: GetTaskDataArgs) => {
	try {
		const batch = await getBatchById({ client, id: batchId });

		const i = taskIndex - batch.start_task_idx;

		const ipfsData = await getIpfsResource({
			client,
			hash: batch.content.field_1,
		});

		// Check if the ipfsData is an array
		if (!Array.isArray(ipfsData)) {
			throw new TaskIpfsError(
				`Task data retrieved from IPFS is not an array. \n${String(ipfsData)}`,
			);
		}

		// Check if there is a task at the index
		if (ipfsData.length <= i || i < 0) {
			throw new TaskIpfsError(
				`Task data retrieved from IPFS does not have a task at index ${taskIndex}. \n${JSON.stringify(
					ipfsData,
				)}`,
			);
		}

		return ipfsData[i];
	} catch (error: unknown) {
		console.error("Error while fetching task data:", error);
		throw error;
	}
};

export const getTaskDataByReservation = (
	client: Client,
	reservation: Reservation,
) => {
	return getTaskData({
		client,
		taskIndex: reservation.task_idx,
		batchId: reservation.batch_idx,
	});
};
