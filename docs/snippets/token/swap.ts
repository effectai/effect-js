import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import {
	createClient,
	jungle4 as chain,
	// eos as chain,
	Session,
	swap,
	type SwapArgs,
	getBalance,
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

// Define the swap arguments
const swapArgs: SwapArgs = {
	client,
	amount: 4, // Define amount, up to 4 digits behind the decimal
	direction: "UsdtToEfx", // or "EfxToUsdt"
};

const preBalance = await getBalance({ client, actor });

// Call the swap function
const response = await swap(swapArgs);
