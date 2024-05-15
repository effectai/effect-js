import type { Asset, NameType } from "@wharfkit/session";
import type { Client } from "../../exports";

export type GetBalanceArgs = {
	client: Client;
	actor: NameType;
};

export const getBalance = async ({
	client,
	actor,
}: GetBalanceArgs): Promise<Asset> => {
	const { network, provider } = client;
	const { contracts } = network.config.efx;

	const [balance] = await provider.v1.chain.get_currency_balance(
		contracts.token,
		actor,
	);

	if (!balance) {
		throw new Error("No balance found");
	}

	return balance;
};
