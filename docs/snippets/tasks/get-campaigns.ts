import { createClient, getCampaigns, jungle4 as network } from "@effectai/sdk";

const client = await createClient({ network });
const campaigns = await getCampaigns({ client });
console.log(campaigns);
