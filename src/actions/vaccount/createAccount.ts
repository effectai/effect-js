import type { TransactResult, Session, NameType } from "@wharfkit/session";
import type { Client } from "../../client";
import { ExtendedSymbol } from "../../utils/structs";
import { VAddress } from "../../utils/variants";

export type CreateVAccountArgs = {
	client: Client;
	session?: Session;
	account?: NameType;
};

export const createVAccount = async ({
	client,
	session,
	account,
}: CreateVAccountArgs): Promise<TransactResult> => {
	const sessionToUse = session ?? client.session;

	if (!sessionToUse) {
		throw new Error("No session provided");
	}

	// TODO: If no account is provided, use the current session actor. Not implemented yet
	const acc: NameType = account ?? sessionToUse.actor;

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
