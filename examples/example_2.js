const { EffectClient } = require('../dist/lib')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')

const main = async () => {
    console.log('Starting ...')
    const sdk = new EffectClient('kylin')

    const provider = new JsSignatureProvider(['secret'])
    const account = {
        accountName: 'account_name',
        permission: 'active',
        publicKey: 'public_key'
    }

    const effectAccount = await sdk.connectAccount(provider, account);
    
    console.log(effectAccount)
    console.log('getCampaign', await sdk.force.getCampaign(5))
}

main()