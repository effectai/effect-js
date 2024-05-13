import {
	createClient,
	jungle4 as network,
	// eos as network,
	getVAccounts,
} from "@effectai/sdk";

// Create client and connect session
const client = await createClient({ network });

const actor = "forcedev1234";
// Retrieve the vAccounts
const [vacc] = await getVAccounts({ client, actor });
console.log(vacc);
