import { Name, type NameType, type UInt64Type } from "@wharfkit/antelope";
import type { Client } from "../../client";
import { NotFoundError } from "../../errors";
import { generateCheckSumForVAccount } from "../../utils/keys";
import type { Account } from "../../@generated/types/efxaccount11";

export type GetVAccountsArgs = {
	client: Client;
	actor: NameType;
};

export const getVAccounts = async ({
	client,
	actor,
}: GetVAccountsArgs): Promise<Account[]> => {
	const { provider, network } = client;
	const { contracts } = network.config.efx;

	const keycs = generateCheckSumForVAccount(Name.from(actor), contracts.token);

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

export type GetAccountByIdArgs = {
	client: Client;
	accountId: UInt64Type;
};

export const getAccountById = async ({
	client,
	accountId,
}: GetAccountByIdArgs) => {
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
