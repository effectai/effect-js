import { readFile } from "fs/promises";
import path from "path";
import Web3 from "web3"
import { EffectClient, createAccount, createWallet } from "../dist/lib/src/index.js"
import { EffectAccount } from "../dist/lib/src/types/effectAccount.js";

describe('🌹 EffectClient Web3 Not Connected Test Suite 💔' , () => {
    
    let client: EffectClient;

    beforeAll(async () => {
        // Instantiate client
        client = new EffectClient('kylin');
    })

    it('Should return correct configuration for Client.', async () => {
        expect(client).toBeTruthy();
        expect(client.config.network).toBe('kylin');
        expect(client.config.host).toBe('https://api.kylin.alohaeos.com')
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

    it('Should throw an: "No account connected" error when client is not connected.', async () => {

        // updatevAccountRows, joinCampaign, uploadCampaign, createCampaign, createeBatch, reserveTask, submitTask, getCampaignJoins
        expect(client.force.createCampaign).toThrowError("No account connected.");
        expect(client.force.createBatch).toThrowError("No account connected.");
        expect(client.force.reserveTask).toThrowError("No account connected.");
        expect(client.force.submitTask).toThrowError("No account connected.");
        expect(client.force.getCampaignJoins).toThrowError("No account connected.");
        expect(client.force.uploadCampaign).toThrowError("No account connected.");
        expect(client.force.joinCampaign).toThrowError("No account connected.");
    })

    it('Should connect with a web3 burner account', async () => {
        // Create burner account
        const burnerAccount = createAccount();
        expect(burnerAccount).toBeTruthy();
        expect(Web3.utils.isAddress(burnerAccount.address)).toBeTruthy();
        expect(Web3.utils.isHex).toBeTruthy;


        // Create burner wallet
        const burnerWallet = createWallet(burnerAccount);
        expect(burnerWallet).toBeTruthy();

        // Connect burner account
        const burnerAccountConnected = await client.connectAccount(burnerWallet);
        expect(burnerAccountConnected).toBeTruthy();
    })

});

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