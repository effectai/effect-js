const { EffectClient, createAccount, createWallet } = require('../dist/lib')

const main = async () => {
    try {
        console.log('Starting...')
        const sdk = new EffectClient('testnet')

        // Instantiating bsc account.
        const account = createAccount(
            // leave empty to generate new private key
            // '0x...'
            // ''
        )
        // Generate web3 instance from account with private key.
        // Could also be the web3 object with a MetaMask connection etc.
        const web3 = createWallet(account)

        // Connect web3 account to SDK
        const effectAccount = await sdk.connectAccount(web3);

        console.log('effectAccount', effectAccount)
        
        // sdk.force.assignQualification(9)

        const res = await sdk.force.getUserQualifications().catch(console.error)
        console.log('res', res)
     
    } catch (e) {
        console.error(e)
    }
}

main()