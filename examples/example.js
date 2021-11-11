const { EffectClient, createAccount, createWallet } = require('../dist/lib')

const main = async () => {
    console.log('Starting...')
    const sdk = new EffectClient('kylin')

    // Instantiating bsc account.
    const account = createAccount(
        // leave empty to generate new private key
        '0x6f46d8d7c9684ed049c941758cb9186eb2b5758221a229e27861fe357edb770d'
    )
    // Generate web3 instance from account with private key.
    // Could also be the web3 object with a MetaMask connection etc.
    const web3 = createWallet(account)

    const effectAccount = await sdk.connectAccount(web3);

    console.log(effectAccount)

    console.log('getCampaign', await sdk.force.getCampaign(5))
}

main()