// import dotenv from 'dotenv'
const dotenv = require('dotenv')
const { EffectClient, createAccount, createWallet } = require('../dist/lib')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const {connectEosAccount, connectBscAccount} = require('./connect_efx_account')

// Initialize
dotenv.config({path: '.env'})
console.log(process.env.ACCOUNTNAME, process.env.PERMISSION, process.env.PRIVATE_KEY, process.env.BSC_KEY)

const config = {
    ACCOUNTNAME: process.env.ACCOUNTNAME,
    PERMISSION: process.env.PERMISSION,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    BSC_KEY: process.env.BSC_KEY
}

// Run the Track!! 
main()

async function main () {
    try {

        const sdk = new EffectClient('mainnet')

        const effectAccount = await connectEosAccount(sdk, config)
        // const effectAccount = await connectBscAccount(sdk)
        console.log('effectAccount', effectAccount)

        sdk.force.getFeePercentage().then(console.log).catch(console.error)

        // const accid = 9
        // const vacc = await sdk.account.getVAccountById(accid).catch(console.error)
        // console.log('vaccount', vacc)

        // const pendingBalance = await sdk.force.getPendingBalance(accid).catch(console.error)
        // console.log('pendingBalance', pendingBalance)

        // const qualis = await sdk.force.getAssignedQualifications(null, 100, true, accid).catch(console.error)
        // console.log('qualis', qualis[3])
        
        // const qual = await sdk.force.getQualification(0).catch(console.error)
        // console.log('qual', qual)




        // sdk.account.getVAccountById(273).then(console.log).catch(console.error)

        // const json = {
        //     name:"Force Alpha",
        //     description:"Original Effect Force user. \nThis Qualification asserts that you have used and worked witht the original Effect Force before we moved to the new Decentralized Effect Network Force.\nA token to remember our humble beginnings. \n",
        //     image:"https://ipfs.effect.ai/ipfs/QmNxFfFKN9htmJqYU4RxwN3UkUDD38jB4kuZHCmqLVGzwu",
        //     ishidden:false
        // }

        // sdk.force.uploadCampaign(json).then(console.log)
        /**
         * Miscellaneous functions 
         */
        // const res = await sdk.force.getCampaignBatches(6).then(console.log).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 6).then(console.log).catch(console.error)
        // const res = await sdk.force.getSubmissionsOfBatch(17179869185).catch(console.error)
        // const res = await sdk.force.deleteCampaign(13).catch(console.error)
        // const res = await sdk.force.getCampaign(13, true).catch(console.error)
        // const res = await sdk.force.getMyLastCampaign(false).catch(console.error)
        // const res = await sdk.force.getCampaignBatches(14).then(console.log).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).then(console.log).catch(console.error)
        
        
        /**
         * Qualification methods
         */
        // const res = await sdk.force.getUserQualifications().catch(console.error)
        // sdk.force.getAssignedQualifications(33).then(console.log).catch(console.error)
        // sdk.force.editQualification(0,  'Name', 'Description', 0, 'https://www.lalala.com/hello.png', false)
        // .then(console.log)
        // .catch(console.error)
        // sdk.force.getQualification(0).then(console.log).catch(console.error)
        // await sdk.force.getQualification(1).then(console.log).catch(console.error)
        
        // sdk.force.assignQualification(0,  389).then(console.log).catch(console.error)
        // sdk.force.unAssignQualification(5, 127).then(console.log).catch(console.error)


        
    } catch (e) {
        console.error(e)
    }
}
