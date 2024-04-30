import type { Asset, Name } from "@wharfkit/session";
import type { Client } from "../../exports";

export type GetBalanceArgs = {
	client: Client;
	actor: Name;
};

/**
 * Get the balance of a user
 * @param {{ client: Client, actor: Name}} Effect SDK client and the actor to get the balance for.
 * @returns {Promise<Asset>} The balance of the user
 * @throws {Error} if no balance is found
 *
 * @example
 * const client = createClient({ network: eos });
 * const actor = Name.from("cryptonode42");
 * const balance = await getBalance({ client, actor });
 * console.log(balance.toString());
 * // => "100.0000 EFX"
 */
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
