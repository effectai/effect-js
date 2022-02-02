/**
 * Unit tests for the Effect Web3 Client
 */

import Web3 from "web3"
import { EffectClient, createAccount, createWallet } from "../../dist/lib/index.js"

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
    }, 30e3)

    it('Should make sure that the provided string is a valid BSC address', () => {
        const randomBscAddress = '0x1234567890123456789012345678901234567890';
        expect(Web3.utils.isAddress(randomBscAddress)).toBeTruthy();

        const validBscAddress = '0xC42Ff5ddE4bcc38E5c7CD35226f0fb305b4e4411'
        expect(Web3.utils.isAddress(validBscAddress)).toBeTruthy();

        const nullBscAddress = '0x0';
        expect(Web3.utils.isAddress(nullBscAddress)).toBeFalsy();
        
        const invalidBscAddress = '0xthisshouldnotbeavalidaddress';
        expect(Web3.utils.isAddress(invalidBscAddress)).toBeFalsy();

        const otherInvalidBscAddress = 123456789
        expect(Web3.utils.isAddress(otherInvalidBscAddress.toFixed())).toBeFalsy();
    })

});

