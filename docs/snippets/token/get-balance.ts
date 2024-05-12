import { createClient, getBalance, jungle4 } from "@effectai/sdk";

const client = await createClient({ network: jungle4 });
const actor = "forcedev1234";
const balance = await getBalance({ client, actor });
console.log(balance.toString());
