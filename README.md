# effect-js 🔥🔥🔥

Javascript API for integration with [Effect.Network](https://effect.network)

# ✒️ Installation

The official distribution for the package can be found at npm.

```
npm i --save @effectai/effect-js
```

# Install & build
Build the `package-lock.json`.
```
npm ci 
npm run build
```

# Quick start
```
const effectSdk = require('@effectai/effect-js')

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

# Development
The best way to get to know how this module works, is by adding features while you can run it. So there are some examples provided to provide an idea how to create transaction with the Effect Network.

Clone the project
```
git clone git@github.com:dfuse-io/client-js.git
```
Install dependencies and dev-dependencies
```
npm install
```
It is now possible to start compiling the typescript files to the module spec of your choice, for now the following module spec's are supported: [ESM, CommonJS, UMD]
```
npm run build:cjs # commonjs
npm run build:esm # esm
npm run build:umd # umd
```
Link it. Now it is possible to use `npm link` in order to link the compiled typescript code to your own project. From the directory of your project run the following command.
```
npm link /path/to/effect-js/
```
From your project folder you should be able to import the compiled code from `effect-js`. Depending on your environment use `import` or `require` as needed.

# Publishing
Run the following command to, build the source, increment the vrsion, and publish the `dist` transpiled code and types to the npm repository, assuming you have the correct credentials.

Make sure the git is clean and everything has been committed, and run the following.
```
npm run publish:latest
```
Running `publish:next` will publish a pre-release of the sdk to the npm repository. Users will need to explicitly opt-in in order to use it.
```
npm run publish:next
```


