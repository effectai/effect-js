// import dotenv from 'dotenv'
const fs = require('fs')
const dotenv = require('dotenv')
const { EffectClient, createAccount, createWallet } = require('../dist/lib')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const old_qualis = require('./old_qualificaitons').old_qualis

// Initialize Config
dotenv.config({path: '.env'})

const configEnv = {
    ACCOUNTNAME: process.env.ACCOUNTNAME,
    PERMISSION: process.env.PERMISSION,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    BSC_KEY: process.env.BSC_KEY
}

console.log(
    '🔥 Starting script with: ', 
    process.env.ACCOUNTNAME, 
    process.env.PERMISSION, 
    process.env.PRIVATE_KEY, 
    process.env.BSC_KEY
)

// Run the Track!! -- Major Lazer
main()

async function main () {
    try {

        // Connect to the Effect Network -- testnet / mainnet
        const sdk = new EffectClient('testnet')

        // const effectAccount = await connectBscAccount(sdk, configEnv)
        const effectAccount = await connectEosAccount(sdk, configEnv)
        console.log(' effectAccount', effectAccount)

        // Get accountid
        const accountid = sdk.effectAccount.vAccountRows[0].id

        // Loop through the old qualis and create them in the new system.
        for (const qual of old_qualis) {
            console.log(qual)
            await sdk.force.createQualification(
                qual, 
                "Official Effect Network Qualification.", 
                null, 
                'https://effect.network/img/logo/logo_icon.png',
                qual.includes('Blacklist') ? true : false
            )
            .then(console.log)
            .catch(console.error)
        }

        // Retrieve all the qualificaitons in order to get the ids.
        let next = true 
        let next_key;
        let qualis = []
        while ( next ) {
            const res = await sdk.force.getQualifications(next_key).catch(console.error)
            qualis = qualis.concat(res.rows)
            next = res.more
            next_key = res.next_key
        }

        // Filter through the qualifications. 
        console.log(`🔥 Found ${qualis.length} qualifications.`)
        const ids = qualis.filter(quali => quali.id === accountid)
        ids.forEach(console.log)
        console.log(`🔥 Found ${ids.length} qualifications with id ${accountid}.`)

        // Save it to a file.
        fs.writeFileSync('qualis.json', JSON.stringify(ids, null, 2))
        console.log('🔥 Qualifications saved to qualis.json')

        console.log('🔥 Script finished.')

     
    } catch (e) {
        console.error(e)
    }
}



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