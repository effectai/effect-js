import { createClient, eos, getBalance, jungle4 } from "@effectai/sdk";

const client = await createClient({ network: eos });
const actor = "cryptonode42";
const balance = await getBalance({ client, actor });
console.log(
	balance.efxBalance.toString(),
	balance.usdtBalance.toString(),
	balance.eosBalance.toString(),
);
