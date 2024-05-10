import { UInt32, UInt64 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import type { GetTableRowsResponse } from "../../../types/helpers";
import { createCompositeU64Key } from "../../../utils/keys";
import { useEFXContracts } from "../../../utils/state";
import type { Reservation } from "../../../@generated/types/effecttasks2";

export type GetReservationsArgs = {
	client: Client;
	lowerBound?: UInt64;
	upperBound?: UInt64;
	indexPosition?: "secondary" | "fourth";
};

export const getReservations = async ({
	client,
	lowerBound,
	upperBound,
	indexPosition = "secondary",
}: GetReservationsArgs): Promise<Reservation[]> => {
	const { tasks } = useEFXContracts(client);

	const response = (await client.provider.v1.chain.get_table_rows({
		scope: tasks,
		code: tasks,
		table: "reservation",
		index_position: indexPosition,
		upper_bound: upperBound,
		lower_bound: lowerBound,
	})) as GetTableRowsResponse<UInt64, Reservation>;

	const { rows } = response;
	return rows;
};

export type GetReservationsForCampaignArgs = {
	client: Client;
	campaignId: number;
};

export const getReservationsForCampaign = async ({
	client,
	campaignId,
}: GetReservationsForCampaignArgs): Promise<Reservation[]> => {
	try {
		const lowerBound = createCompositeU64Key(campaignId, 0);
		const upperBound = createCompositeU64Key(campaignId, Number(UInt32.max));
		return await getReservations({ client, lowerBound, upperBound });
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export type GetReservationForVAccountArgs = {
	client: Client;
	vAccountId: number;
};

export const getReservationsForVAccount = async ({
	client,
	vAccountId,
}: GetReservationForVAccountArgs): Promise<Reservation[]> => {
	try {
		if (!vAccountId) throw new Error("vAccountId is required");

		return await getReservations({
			client,
			lowerBound: UInt64.from(vAccountId),
			upperBound: UInt64.from(vAccountId),
			indexPosition: "fourth",
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export type GetReservationForCampaignArgs = {
	client: Client;
	campaignId: number;
	vAccountId: number;
};

// TODO: This function name is unclear, we should rename it to: getVAccountReservationForCampaign
export const getReservationForCampaign = async ({
	client,
	campaignId,
	vAccountId,
}: GetReservationForCampaignArgs): Promise<Reservation> => {
	try {
		const bound = createCompositeU64Key(campaignId, vAccountId);
		const data = await getReservations({
			client,
			lowerBound: bound,
			upperBound: bound,
		});

		const [reservation] = data;
		return reservation;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
