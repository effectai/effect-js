/**
 * End to End (E2E) tests for web3.js
 */

import { EffectClient, createAccount, createWallet } from "../../dist/lib/src/index.js"
import { EffectAccount } from "../../dist/lib/src/types/effectAccount.js"; 
import { readFile } from "fs/promises";
import path from "path";
import Web3 from "web3";


describe('End to End testing of non connected client.', () => {
    let client: EffectClient;

    beforeAll(async () => {
        // Instantiate client
        client = new EffectClient('kylin');
    })

    it('Should return a list of campaigns when not connected.', async () => {
        // Retrieve Campaign
        const campaign = await client.force.getCampaigns(0);
        expect(campaign).toBeTruthy();
        expect(campaign.rows.length).toBeGreaterThan(5)
    }, 20e3)

    it('Should fail when calling getMyLastCampaign().', async () => {
        expect(client.force.getMyLastCampaign).rejects.toThrowError()
    })


})

describe('💮 EffectClient Web3 Connected Account Test Suite. 💖', () => {
    let burnerWallet: Web3;
    let client: EffectClient;
    let burnerAccount: EffectAccount

    beforeAll(async () => {
        // Instantiate client and connect with burner account
        client = new EffectClient('kylin');
        burnerAccount = createAccount();
        burnerWallet = createWallet(burnerAccount);
        await client.connectAccount(burnerWallet);
    })
    
    it('Should create a campaign when connected.', async () => {
        // Retrieve Campaign
        // const templateText = fs.readFileSync('./template.html', 'utf8')
        
        const templateText = await readFile(path.join(__dirname, '../assets/template.html'), 'utf8');
        const imageUrl = 'https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4'
        const campaignToIpfs = {
            title: 'Tweet Sentiment',
            description: 'Networked well-modulated instruction set',
            instructions: `American whole magazine truth stop whose. On traditional measure example sense peace`,
            template: templateText,
            image: imageUrl,
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