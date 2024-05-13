import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as chain,
	// eos as chain,
	Session,
	createVAccount,
	type CreateVAccountArgs,
	getVAccounts,
} from "@effectai/sdk";

const actor = "actor-name";
const permission = "permission-level";

// Create a session
const session = new Session({
	chain,
	actor,
	permission,
	walletPlugin: new WalletPluginPrivateKey("your_private_key"),
});

// Create client and connect session
const client = await createClient({ session });
const account = "account-name";
const tx_result = await createVAccount({ client, account });
console.log(tx_result);

// Retrieve the created vaccount
const [vacc] = await getVAccounts({ client, actor: account });
