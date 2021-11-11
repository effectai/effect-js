const effectjs = require('./')
const Web3 = require('web3')

const main = async () => {
    console.log('Starting...')

    // Example sdkOptions, that are not needed right now. But are here for illuminating how to use the configuration object.
    const sdkOptions = {
        network: 'kylin',
        host: 'https://api.kylin.alohaeos.com'
    }
    const sdk = new effectjs.EffectClient('node', sdkOptions)

    const web3 = new Web3('https://bsc-dataseed.binance.org')

    const account = effectjs.createBurnerWallet(web3)
    // const account = effectjs.privateKeyToBurnerWallet(web3, '0x6f46d8d7c9684ed049c941758cb9186eb2b5758221a229e27861fe357edb770d')
    const accountFromWallet = effectjs.addToBurnerWallet(web3, account)
    console.log(accountFromWallet)

    const effectAccount = await sdk.connectAccount(null, web3);
    
    console.log('getCampaign', await sdk.force.getCampaign(5))
}

main()