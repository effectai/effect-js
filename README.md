# effect-js 🔥🔥🔥

Javascript API for integration with [Effect.Network](https://effect.network)

# ✒️ Installation

The official distribution for the package can be found at npm.

```
npm i --save @effectai/effect-js
```

# Install & build
```
npm i
npm run build
```

# Example usage
```
const signatureProvider = new JsSignatureProvider([PRIVATE_KEY])
const options = {
  network: "kylin",
  host: 'https://api.kylin.alohaeos.com',
  signatureProvider: signatureProvider
}
const sdk = new effectSdk.EffectClient(options);

sdk.account.openAccount('account_name')
sdk.account.getBalance('account_name')

// from account, to vaccount, amount in EFX
sdk.account.deposit('from_account_name', 'to_vaccount_name', '1.0000')

// from vaccount, to account, amount in EFX
sdk.account.withdraw('from_vaccount_name', 'to_account_name', '1.0000')

// from vaccount, to vaccount, amount in EFX
sdk.account.vtransfer('from_vaccount_name', 'to_vaccount_name', '1.0000')
```
