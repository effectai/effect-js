import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as chain,
	// eos as chain,
	Session,
	claim,
	type ClaimArgs,
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

// Check pending payments
const pendingPayments = await getPendingPayments({
	client,
	vAccountId: vacc.id,
});

// If there are claimable payments, claim them.
if (pendingPayments.totalEfxClaimable > 0) {
	await claim({ client });
}
