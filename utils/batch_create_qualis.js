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

        // const res = await sdk.force.getUserQualifications().catch(console.error)
        // const res = await sdk.force.getCampaignBatches(4).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).catch(console.error)
        // const res = await sdk.force.getSubmissionsOfBatch(17179869185).catch(console.error)
        // const res = await sdk.force.deleteCampaign(13).catch(console.error)
        // const res = await sdk.force.getCampaign(13, true).catch(console.error)
        // const res = await sdk.force.getMyLastCampaign(false).catch(console.error)
        // const res = await sdk.force.getCampaignBatches(14).then(console.log).catch(console.error)
        // const res = await sdk.force.deleteBatch(0, 14).then(console.log).catch(console.error)

        // for (const qual of old_qualis) {
        //     console.log(qual)
        //     await sdk.force.createQualification(
        //         qual, 
        //         "Official Effect Network Qualification.", 
        //         null, 
        //         'https://effect.network/img/logo/logo_icon.png',
        //         qual.includes('Blacklist') ? true : false
        //     )
        //     .then(console.log)
        //     .catch(console.error)
        // }

        let next = true 
        let next_key;
        let qualis = []

        while ( next ) {
            const res = await sdk.force.getQualifications(next_key).catch(console.error)
            qualis = qualis.concat(res.rows)
            next = res.more
            next_key = res.next_key
        }

        console.log(`🔥 Found ${qualis.length} qualifications.`)

        const ids = qualis.map(quali => quali.id)


        // Save qualis to file
        const fs = require('fs')
        fs.writeFileSync('qualis.json', JSON.stringify(qualis, null, 2))



     
    } catch (e) {
        console.error(e)
    }
}

async function connectBscAccount(effectsdk) {
    try {
        console.log('🔥 Connecting to BSC account.')
        const account = createAccount(process.env.BSC_KEY ?? '') // enter bsc privatekey here.
        const web3 = createWallet(account)
        const effectAccount = await effectsdk.connectAccount(web3)
        console.log(`🔥 Connected to bsc: ${effectAccount}`)
        return effectAccount            
    } catch (error) {
        console.error('⚠ Error connecting Bsc account.', error)
    }
}

async function connectEosAccount(effectsdk) {
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
        console.error('⚠ Error connecting EOS account', error)
    }
}

