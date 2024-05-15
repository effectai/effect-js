import {
	createClient,
	jungle4 as network,
	// eos as network , // Use `eos` to use mainnet
	getAccountById,
} from "@effectai/sdk";

// Create client to make unauthenticated transactions
const client = await createClient({ network });

// Retrieve data from Effect Network
const vAccount = await getAccountById({ client, accountId: 1 });
console.log(vAccount); // => Account Details
