import { EffectClient, createAccount, createWallet } from "@effectai/effect-js";
import Web3 from "web3"
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

describe('🌄 EffectClient Web3 Test Suite', () => {
    
    let client: EffectClient;

    beforeEach(async () => {
        // Instantiate client
        client = new EffectClient('kylin');
    })

    it('Should return correct configuration for Client.', async () => {
        expect(client).toBeTruthy();
        expect(client.config.network).toBe('kylin');
    })

    it('Should return a campaign when not connected.', async () => {
        // Retrieve Campaign
        const campaign = await client.force.getCampaigns(0);
        expect(campaign).toBeTruthy();
    })

    it('Should fail when trying to create campaign when not', async () => {

        // Check to see if method will throw error when not connected.
        // expect(await client.force.createCampaign('randoHash', '2')).rejects.toThrowError("No account connected.");

    })

    it('Should connect with a burner account', async () => {
        // Create burner account
        const burnerAccount = createAccount();
        expect(burnerAccount).toBeTruthy();
        expect(Web3.utils.isAddress(burnerAccount.address)).toBeTruthy();
        expect(Web3.utils.isHex).toBeTruthy;


        // Create burner wallet
        const burnerWallet = createWallet(burnerAccount);
        expect(burnerWallet).toBeTruthy();

        // Connect burner account
        // const burnerAccountConnected = await client.connectAccount(burnerWallet);
        // expect(burnerAccountConnected).toBeTruthy();
    })


});

// describe('🌄 EffectClient EOS-Signature Provider Test Suite.', () => {
    
//         it('Should return correct convifguration for Client.', () => {
            
//             // Instantiate client
//             const client = new EffectClient('kylin');
//             expect(client).toBeTruthy();
//             expect(client.config.network).toBe('kylin');

//         })
// })
