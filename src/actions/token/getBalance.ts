import type { Asset, NameType } from "@wharfkit/session";
import type { Client } from "../../exports";

export type GetBalanceArgs = {
	client: Client;
	actor: NameType;
};

export const getBalance = async ({
	client,
	actor,
}: GetBalanceArgs): Promise<{
	efxBalance: Asset;
	usdtBalance: Asset;
	eosBalance: Asset;
}> => {
	const { network, provider } = client;
	const { contracts } = network.config.efx;

	const [efxBalance] = await provider.v1.chain.get_currency_balance(
		contracts.token,
		actor,
	);

	const [usdtBalance] = await provider.v1.chain.get_currency_balance(
		contracts.usdt,
		actor,
	);

	const [eosBalance] = await provider.v1.chain.get_currency_balance(
		contracts.eostoken,
		actor,
	);

	if (!efxBalance && !usdtBalance && eosBalance) {
		throw new Error("No efxBalance found");
	}

	return {
		efxBalance,
		usdtBalance,
		eosBalance,
	};
};
