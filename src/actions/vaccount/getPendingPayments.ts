import { type UInt64, UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../client";
import type { GetTableRowsResponse } from "../../types/helpers";
import type { Payment } from "../../types/user";
import {
	type ForceSettings,
	getForceSettings,
} from "../tasks/getForceSettings";

export const isClaimable = (p: Payment, forceSettings: ForceSettings) => {
	return (
		new Date(`${new Date(p.last_submission_time)}UTC`).getTime() / 1000 +
			forceSettings.payout_delay_sec <
		Date.now() / 1000
	);
};

export const extractAndParseQuantity = (quantity: string) =>
	Number.parseFloat(quantity.match(/[0-9.]+/)?.[0] || "0");

export const getTimeToClaim = (p: Payment, forceSettings: ForceSettings) => {
	return (
		new Date(`${new Date(p.last_submission_time)}UTC`).getTime() / 1000 +
		forceSettings.payout_delay_sec -
		Date.now() / 1000
	);
};

export type GetPendingPaymentsArgs = {
	client: Client;
	vAccountId: number;
};

export const getPendingPayments = async ({
	client,
	vAccountId,
}: GetPendingPaymentsArgs) => {
	const { network, provider } = client;
	const { contracts } = network.config.efx;

	const data = (await provider.v1.chain.get_table_rows({
		code: contracts.tasks,
		scope: contracts.tasks,
		table: "payment",
		index_position: "tertiary",
		key_type: "i64",
		lower_bound: UInt128.from(vAccountId),
		upper_bound: UInt128.from(vAccountId),
	})) as GetTableRowsResponse<UInt64, Payment>;

	const forceSettings = await getForceSettings({ client });

	const claimablePayments = data.rows.filter((p) =>
		isClaimable(p, forceSettings),
	);

	const totalEfxPending = data.rows.reduce(
		(acc, p) => acc + extractAndParseQuantity(p.pending.quantity) || 0,
		0,
	);

	const totalEfxClaimable = claimablePayments.reduce(
		(acc, p) => acc + extractAndParseQuantity(p.pending.quantity) || 0,
		0,
	);

	return {
		pendingPayments: data.rows,
		claimablePayments,
		totalEfxPending,
		totalEfxClaimable,
	};
};
