import dotenv from 'dotenv'
const { EffectClient, createAccount, createWallet } = require('../dist/lib')

// Initialize
dotenv.config()

// Run the Track
main()

async function main () {
    try {
        console.log('Starting...')
        const sdk = new EffectClient('testnet')

        // Instantiating bsc account.
        const account = createAccount(
            // leave empty to generate new private key
            // '0x...'
            ''
        )
        // Generate web3 instance from account with private key.
        // Could also be the web3 object with a MetaMask connection etc.
        const web3 = createWallet(account)

        // Connect web3 account to SDK
        const effectAccount = await sdk.connectAccount(web3);

        console.log('effectAccount', effectAccount)

        // const res = await sdk.force.getUserQualifications().catch(console.error)
        // const res = await sdk.force.getCampaignBatches(4).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).catch(console.error)
        // const res = await sdk.force.getSubmissionsOfBatch(17179869185).catch(console.error)
        // const res = await sdk.force.deleteCampaign(13).catch(console.error)
        // const res = await sdk.force.getCampaign(13, true).catch(console.error)
        // const res = await sdk.force.getMyLastCampaign(false).catch(console.error)
        console.log('res', res)
     
    } catch (e) {
        console.error(e)
    }
}

async function connectBscAccount() {
    try {
        console.log('🔥 Connecting to BSC account.')
        const account = createAccount(process.env.BSC_KEY) // enter bsc privatekey here.
        const web3 = createWallet(account)
        const effectAccount = await sdk.connectAccount(web3)
        console.log(`🔥 Connected to bsc: ${effectAccount}`)
        return effectAccount            
    } catch (error) {
        console.error('⚠ Error connecting Bsc account.', error)
    }
}

async function connectEosAccount() {
    try {
        console.log("🔥 Connecting to account")
        const provider = new JsSignatureProvider([process.env.PRIVATE_KEY])
        const eos_accnt = {
            accountName: process.env.ACCOUNTNAME,
            permission: process.env.PERMISSION,
            privateKey: process.env.PRIVATE_KEY
        }
        const effect_account = await effectsdk.connectAccount(provider, eos_accnt)
        console.log(`🔥 Connected to account: ${effect_account.accountName}`)
        return effect_account        
    } catch (error) {
        console.error('⚠ Error connecting ESOS accountk', error)
    }
}