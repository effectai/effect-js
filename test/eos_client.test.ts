import { eosWalletAuth } from './../src/types/eosWalletAuth';
import { EffectClient, createAccount, createWallet } from "../dist/lib/src/index.js"
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import dotenv from "dotenv";
import path from 'path';
import { readFile } from 'fs/promises';

// Make sure to create .env.test in test folder
const configuration = dotenv.config({path: path.join(__dirname, '.env.test')});

if (configuration.error) {
    console.log(configuration.error)
    console.log("Please create a .env file in the root directory of your project, with the following keys:EOS_PRIVATE_KEY, EOS_PUBLIC_KEY, EOS_ACCOUNT_NAME, EOS_ACCOUNT_PERMISSION")
} 

const signatureProvider = new JsSignatureProvider([process.env.EOS_PRIVATE_KEY]);
const eosaccount: eosWalletAuth = {
    accountName: process.env.EOS_ACCOUNT_NAME,
    permission: process.env.EOS_ACCOUNT_PERMISSION,
    publicKey: process.env.EOS_PUBLIC_KEY
}

describe('🌻 EffectClient EOS-Signature Provider Test Suite.', () => {

    let client: EffectClient;

    beforeAll(async () => {
        // Instantiate client
        client = new EffectClient('kylin');
    })    
    
    it('Should return correct convifguration for Client.', async () => {
        
        console.log('something else');
        
        console.log(process.env.FOO)

        // Connect burner account
        const burnerAccountConnected = await client.connectAccount(signatureProvider, eosaccount);
        expect(burnerAccountConnected).toBeTruthy();
    })

})


describe('💮 EffectClient EOS Connected Account Test Suite. 💖', () => {

    let client: EffectClient;

    beforeAll(async () => {
        // Instantiate client and connect with burner account
        client = new EffectClient('kylin');
        await client.connectAccount(signatureProvider, eosaccount);
    })
    
    it('Should create a campaign when connected.', async () => {
        // Retrieve Campaign
        const templateText = await readFile(path.join(__dirname, './template.html'), 'utf8');
        // const templateText = fs.readFileSync('./template.html', 'utf8')
        const campaignToIpfs = {
            title: 'Tweet Sentiment',
            description: 'Networked well-modulated instruction set',
            instructions: `American whole magazine truth stop whose. On traditional measure example sense peace`,
            template: templateText,
            image: 'https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4',
            category: 'Effect Socials',
            example_task: { 'tweet_id': '20' },
            version: 1,
            reward: 1
        }
        const campaign = await client.force.makeCampaign(campaignToIpfs, '2');
        expect(campaign).toBeTruthy();

        // Retrieve Campaign
        const lastCampaign = await client.force.getMyLastCampaign();
        expect(lastCampaign).toBeTruthy();
    }, 20e3)

})
