import type { Name, TransactResult, Session } from "@wharfkit/session";
import type { Client } from "../../client";
import { ExtendedSymbol } from "../../utils/structs";
import { VAddress } from "../../utils/variants";

export type CreateVAccountArgs = {
	client: Client;
	session?: Session;
	account?: Name;
};

/**
 * Creates a virtual Effect account
 * Client must be initialized
 * Session is optional if the client has a session already
 * Account is optional, can be initialized with:
 *
 * ```ts
 * import { Name } from "@wharfkit/session";
 * const account: Name = Name.from("accountname");
 * ```
 * The account name must be a valid EOS account name.
 * If no account is provided, the current session actor will be used.
 *
 * @param {CreateVAccountArgs} { client, session, account } - Provide the client, session, and account name.
 * @returns {TransactResult = The result of the the transaction.}
 *
 * @example
 * ```ts
 * import { createVAccount } from "@effectai/effect-js";
 * import { Name } from "@wharfkit/session";
 * const account: Name = Name.from("accountname");
 * const result = await createVAccount({ client, account });
 * ```
 */
export const createVAccount = async ({
	client,
	session,
	account,
}: CreateVAccountArgs): Promise<TransactResult> => {
	const sessionToUse = session ?? client.session;

	if (!sessionToUse) {
		throw new Error("No session provided");
	}

	// If no account is provided, use the current session actor
	const acc: Name = account ?? sessionToUse.actor;

	const { actor } = sessionToUse;
	const { contracts, token } = client.network.config.efx;

	const authorization = [
		{
			actor,
			permission: sessionToUse.permission,
		},
	];

	const action = {
		account: contracts.vaccount,
		name: "open",
		authorization,
		data: {
			acc: VAddress.from(acc),
			symbol: new ExtendedSymbol(
				`${token.precision},${token.symbol}`,
				contracts.token,
			),
			payer: actor,
		},
	};

	return await sessionToUse.transact({ action });
};
