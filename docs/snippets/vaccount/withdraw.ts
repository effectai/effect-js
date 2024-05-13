import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as chain,
	// eos as chain,
	Session,
	withdraw,
	type WithdrawArgs,
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

// Retrieve user balance
const [vacc] = await getVAccounts({ client, actor });
console.log(vacc.balance);

// If there are claimable payments, claim and pay them out.
const result = await withdraw({ client, quantity: 42 });
