/**
 * Unit tests for the Effect EOS Client
 */

import { eosWalletAuth } from './../../src/types/eosWalletAuth';
import { EffectClient, createAccount, createWallet } from "../../dist/lib/index.js"
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import dotenv from "dotenv";
import path from 'path';
import { readFile } from 'fs/promises';

// Make sure to create .env.test in test folder
let configuration
try {
    dotenv.config({path: path.join(__dirname, '../.env.test')});
    if (configuration.error) {
        console.log(configuration.error)
        console.log("Please create a .env file in the root directory of your project, with the following keys:EOS_PRIVATE_KEY, EOS_PUBLIC_KEY, EOS_ACCOUNT_NAME, EOS_ACCOUNT_PERMISSION")
    }     
} catch (error) {
    console.log('.env.test not found, using other environment variables')
}

describe('🌻 EffectClient EOS-Signature Provider Test Suite.', () => {

    let client: EffectClient;

    beforeAll(async () => {
        // Instantiate client
        client = new EffectClient('jungle');
    })    
    
    it('Should return correct configuration for Client.', async () => {
        const signatureProvider = new JsSignatureProvider([process.env.EOS_PRIVATE_KEY]);
        const eosaccount: eosWalletAuth = {
            accountName: process.env.EOS_ACCOUNT_NAME,
            permission: process.env.EOS_ACCOUNT_PERMISSION,
            publicKey: process.env.EOS_PUBLIC_KEY
        }
        
        // Connect burner account
        const burnerAccountConnected = await client.connectAccount(signatureProvider, eosaccount);
        expect(burnerAccountConnected).toBeTruthy();
    })

})

