// import dotenv from 'dotenv'
const fs = require('fs')
const dotenv = require('dotenv')
const { EffectClient, createAccount, createWallet } = require('../dist/lib')
const { connectEosAccount, connectBscAccount } = require('./connect_efx_account.js')
const { old_qualis, example_qualis } = require('./old_qualificaitons').old_qualis

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
        const sdk = new EffectClient('mainnet')

        // const effectAccount = await connectBscAccount(sdk, configEnv)
        const effectAccount = await connectEosAccount(sdk, configEnv)
        console.log(' effectAccount', effectAccount)

        // Get accountid
        const accountid = sdk.effectAccount.vAccountRows[0].id

        // fs read json file
        const json_file = fs.readFileSync('./qualis.json', 'utf8')
        const qualis = JSON.parse(json_file)
        console.log(' qualis', qualis)

        const map = []

        for (oldqual of old_qualis) {
            for (newqual of qualis) {
                if (oldqual.name === newqual.info.name && oldqual.old_id) {
                    oldqual.new_id = newqual.id
                    oldqual.new_name = newqual.info.name
                    map.push([oldqual.old_id, newqual.id])
                }
            }
        }

        console.log(old_qualis)
        console.log(map)




        console.log('🔥 Script finished.')

     
    } catch (e) {
        console.error(e)
    }
}



/**
 * old batch creation page.
 * 
        // Loop through the old qualis and create them in the new sy\stem.
        // for (const qual of example_qualis) {
        //     // console.log({
        //     //     name: qual.name,
        //     //     description: qual.description,
        //     //     type: null, 
        //     //     img_url: 'https://effect.network/img/logo/logo_icon.png',
        //     //     is_hidden: false
        //     // })

        //     console.log('🔥 Creating qualification: ', qual.name)

        //     // For approved qualifications
        //     await sdk.force.createQualification(
        //         qual.name, 
        //         qual.description, 
        //         null, 
        //         'https://effect.network/img/logo/logo_icon.png',
        //         false
        //     )
        //     .then(console.log)
        //     .catch(console.error)

        //     // For rejected qualifications
        //     await sdk.force.createQualification(
        //         `${qual.name} - BlockList`,
        //         qual.description,
        //         null,
        //         'https://effect.network/img/logo/logo_icon.png',
        //         true
        //     )
        //     .then(console.log)
        //     .catch(console.error)

        console.log('🔥 Done creating qualificaitons: ', example_qualis.length)
        console.log('🔥 Retrieving newly created qualifications.')
        // }
 */

/**
 * 
 * retrieve all qualifications from the old system and create them in the new system.
        // Retrieve all the qualificaitons in order to get the ids.
        let next = true 
        let next_key;
        let qualis = []
        while ( next ) {
            const res = await sdk.force.getQualifications(next_key).catch(console.error)
            console.log(res)
            qualis = qualis.concat(res.rows)
            next = res.more
            next_key = res.next_key
        }

        // Filter through the qualifications. 
        console.log(`🔥 Found ${qualis.length} qualifications.`)
        const ids = qualis.filter(quali => quali.account_id === accountid)
        ids.forEach(console.log)
        console.log(`🔥 Found ${ids.length} qualifications for account with id ${accountid}.`)

        // Save it to a file.
        fs.writeFileSync('qualis.json', JSON.stringify(ids, null, 2))
        console.log('🔥 Qualifications saved to qualis.json')
 */