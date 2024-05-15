import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as chain,
	// eos as chain,
	Session,
	payout,
	type PayoutArgs,
	getPendingPayments,
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

const [vacc] = await getVAccounts({ client, actor });

// Check pending payments,
// Not nessesary for this snippet, but helpful to know if there are any pending payments.
// This check is also already done in the payout function.
const pendingPayments = await getPendingPayments({
	client,
	vAccountId: vacc.id,
});

// If there are claimable payments, claim and pay them out.
const result = await payout({ client, actor });
