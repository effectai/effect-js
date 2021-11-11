const effectjs = require('./')

const main = async () => {
    console.log('Starting...')
    const sdk = new effectjs.EffectClient('kylin')

    // Instantiating burnerwallet.
    const burnerwallet = new effectjs.BurnerWallet().addAccount()
    // OR
    // const burnerwallet = new effectjs.BurnerWallet(
    //     '0x602df95949fc35d550100ab9e28142fceff2b42dd51f605ec92cd6f34a43af7a'
    // ).addAccount()

    const web3 = burnerwallet.getWeb3()
    const effectAccount = await sdk.connectAccount(null, web3);
    
    console.log(effectAccount)
    console.log('getCampaign', await sdk.force.getCampaign(5))
}

main()