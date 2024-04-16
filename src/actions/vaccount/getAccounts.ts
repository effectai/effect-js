import type { Name, UInt64Type } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { NotFoundError } from "../../errors";
import type { VAccount } from "../../types/user";
import { generateCheckSumForVAccount } from "../../utils/keys";

export const getVAccounts = async (
	client: Client,
	actor: Name,
): Promise<VAccount[]> => {
	const { provider, network } = client;
	const { contracts } = network.config.efx;

	const keycs = generateCheckSumForVAccount(actor, contracts.token);

	const response = await provider.v1.chain.get_table_rows({
		code: contracts.vaccount,
		table: "account",
		scope: contracts.vaccount,
		upper_bound: keycs,
		lower_bound: keycs,
		index_position: "secondary",
		key_type: "sha256",
	});

	return response.rows;
};

export const getAccountById = async ({
	client,
	accountId,
}: {
	client: Client;
	accountId: UInt64Type;
}) => {
	const { provider, network } = client;
	const { contracts } = network.config.efx;

	const response = await provider.v1.chain.get_table_rows({
		code: contracts.vaccount,
		scope: contracts.vaccount,
		table: "account",
		limit: 1,
		key_type: "i64",
		upper_bound: accountId,
		lower_bound: accountId,
	});

	const account = response.rows[0];

	if (!account) {
		throw new NotFoundError(`Account with id ${accountId} not found`);
	}

	return account;
};
