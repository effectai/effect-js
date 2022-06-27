const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only


/**
 * Connect with an BSC account.
 * @param {} effectsdk 
 * @returns 
 */
 async function connectBscAccount(effectsdk, configEnv) {
    try {
        console.log('🔥 Connecting to BSC account.')
        const account = createAccount(configEnv.BSC_KEY ?? '') // enter bsc privatekey here.
        const web3 = createWallet(account)
        const effectAccount = await effectsdk.connectAccount(web3)
        console.log(`🔥 Connected to bsc: ${effectAccount}`)
        return effectAccount            
    } catch (error) {
        console.error('🧯 Error connecting Bsc account.', error)
    }
}


/**
 * Connect with an EOS account.
 * @param {*} effectsdk 
 * @returns 
 */
async function connectEosAccount(effectsdk, configEnv) {
    try {
        console.log("🔥 Connecting to account")
        const provider = new JsSignatureProvider([configEnv.PRIVATE_KEY])
        const eos_accnt = {
            accountName: configEnv.ACCOUNTNAME,
            permission: configEnv.PERMISSION,
            privateKey: configEnv.PRIVATE_KEY
        }
        const effect_account = await effectsdk.connectAccount(provider, eos_accnt)
        console.log(`🔥 Connected to account: ${effect_account.accountName}`)
        return effect_account        
    } catch (error) {
        console.error('🧯 Error connecting EOS account', error)
    }
}

module.exports = {
    connectBscAccount,
    connectEosAccount
}