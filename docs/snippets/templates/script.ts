import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { createClient, createCampaign, eos, Session, type CreateCampaignArgs } from '@effectai/sdk';

const campaignFile = Bun.file("index.html")
const inputSchema = Bun.file("input-schema.json")
const exampleTask = Bun.file("example.json")

const session = new Session({
  chain: eos,
  actor: "your_account",
  permission: "your_permission",
  walletPlugin: new WalletPluginPrivateKey("your_private_key"),
})

const client = await createClient({ session })

const campaign: CreateCampaignArgs = {
  client: client,
  campaign: {
    category: "category",
    description: "Description for this Campaign",
    estimated_time: 1,
    example_task: exampleTask.toString(),
    image: "image",
    instructions: "Instructions for this Camapign",
    input_schema: inputSchema.toString(),
    output_schema: null,
    template: campaignFile.toString(),
    title: "Title for this Campaign",
    version: 1,
    reward: 1,
    maxTaskTime: 1,
    qualitications: [],
  },
}

const response = createCampaign(campaign)
console.debug(response)
