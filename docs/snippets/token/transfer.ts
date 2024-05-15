import {
	createClient,
	jungle4 as network,
	vTransfer,
	getVAccounts,
} from "@effectai/sdk";

const client = await createClient({ network });
const receiver = "receiver-account-name";

const [vAccountReceiver] = await getVAccounts({
	client,
	actor: receiver,
});

const result = await vTransfer({
	client,
	to_id: vAccountReceiver.id,
	quantity: 12,
});
