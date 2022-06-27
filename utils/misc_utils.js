// import dotenv from 'dotenv'
const dotenv = require('dotenv')
const { EffectClient, createAccount, createWallet } = require('../dist/lib')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const old_qualis = require('./old_qualificaitons').old_qualis

// Initialize
dotenv.config({path: '.env'})

console.log(process.env.ACCOUNTNAME, process.env.PERMISSION, process.env.PRIVATE_KEY, process.env.BSC_KEY)

// Run the Track!! 
main()

async function main () {
    try {

        const sdk = new EffectClient('testnet')

        const effectAccount = await connectEosAccount(sdk)
        // const effectAccount = await connectBscAccount(sdk)
        console.log('effectAccount', effectAccount)

        /**
         * Miscellaneous functions 
         */
        // const res = await sdk.force.getUserQualifications().catch(console.error)
        // const res = await sdk.force.getCampaignBatches(4).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).catch(console.error)
        // const res = await sdk.force.getSubmissionsOfBatch(17179869185).catch(console.error)
        // const res = await sdk.force.deleteCampaign(13).catch(console.error)
        // const res = await sdk.force.getCampaign(13, true).catch(console.error)
        // const res = await sdk.force.getMyLastCampaign(false).catch(console.error)
        // const res = await sdk.force.getCampaignBatches(14).then(console.log).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).then(console.log).catch(console.error)
        
    } catch (e) {
        console.error(e)
    }
}
