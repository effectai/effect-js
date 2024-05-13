import {
	createClient,
	jungle4 as network,
	getVAccounts,
	deposit,
	type DepositArgs,
} from "@effectai/sdk";

const client = await createClient({ network });
const actor = "account-name";
const [vAccount] = await getVAccounts({ client, actor });
const result = await deposit({ client, vAccountId: vAccount.id, amount: 0.1 });
