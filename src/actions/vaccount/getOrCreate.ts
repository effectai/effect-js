import type { NameType } from "@wharfkit/antelope";
import type { Session } from "@wharfkit/session";
import {
	type Client,
	createVAccount,
	getVAccounts,
	type Account,
} from "../../exports";

export const getOrCreateVAccount = async ({
	client,
	actor,
	session,
}: {
	client: Client;
	actor: NameType;
	session?: Session;
}): Promise<Account> => {
	try {
		let [account] = await getVAccounts({ client, actor });

		if (!account) {
			await createVAccount({ client, session, account: actor });

			[account] = await getVAccounts({ client, actor });
		}

		return account;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get or create vAccount");
	}
};
