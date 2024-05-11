import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as network,
	// eos as network , // Use `eos` to use mainnet
	Session,
	createVAccount,
} from "@effectai/sdk";

// Set up session with wallet and chain
const session = new Session({
	actor: "account_name_here",
	permission: "permission_here",
	walletPlugin: new WalletPluginPrivateKey("your_private_key_here"),
	chain: network,
});

// Create client to make authenticated transactions
const authClient = await createClient({ session });

// Create a new Effect Account
const account = "efxforce1112";
const response = await createVAccount({ client: authClient, account });
console.log(response); // => Transaction Details
