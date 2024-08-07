import { UInt32 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";
import { useEFXContracts } from "../../utils/state";
import { uploadIpfsResource, ipfsCIDToHex } from "../ipfs/uploadIpfsResource";
import type { Reservation } from "../../@generated/types/tasks.efx";

export type SubmitTaskArgs = {
	client: Client;
	reservation: Reservation;
	data: Record<string, unknown>;
};

export const submitTask = async ({
	client,
	reservation,
	data,
}: SubmitTaskArgs) => {
	try {
		if (!client.session) {
			throw new SessionNotFoundError("Session is required for this method.");
		}

		const { authorization, transact, actor } = client.session;
		const { tasks } = useEFXContracts(client);

		const ipfsData = await uploadIpfsResource({ client, data });
		const ipfsHex = ipfsCIDToHex(ipfsData);

		const response = await transact({
			action: {
				account: tasks,
				name: "submittask",
				authorization,
				data: {
					campaign_id: UInt32.from(reservation.campaign_id),
					account_id: UInt32.from(reservation.account_id),
					task_idx: UInt32.from(reservation.task_idx),
					data: { first: 1, second: ipfsHex },
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
