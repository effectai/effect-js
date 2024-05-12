import {
	createClient,
	jungle4 as network,
	// eos as network , // Use `eos` to use mainnet
} from "@effectai/sdk";

// Create client
const client = await createClient({ network });
