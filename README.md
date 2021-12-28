<p align="center"><img src="https://effect.network/img/logo/logo.png" width="400px"></p>


# 🔥 effect-js 

Javascript SDK for integration with [https://effect.network](https://effect.network)  


# Hackathon
Join the hackathon and get your first effect-js project running!
[Join at DevPost](https://effect-network-hackathon.devpost.com/)

# Boilerplate Demo
A demo of the browser boilerplate can be found at the following link:
[Hackathon Browser BoilerPlate Demo](https://effectai.github.io/hackathon-boilerplate/)

# Quickstart
Take a look at the [quickstart guide](https://developer.effect.network/quickstart/) in order to understand how to install and use the library.

# SDK-Reference
The SDK reference is available here: [SDK-Reference](https://effectai.github.io/effect-js/)  

# ✒️ Installation

The official distribution for the package can is available at [npm](https://www.npmjs.com/package/effect-js).

```bash
npm i @effectai/effect-js
```

# 🏎 Quick start
Simple example of how to use the library in order to create a wallet and publish a campaign on the platform. 

```javascript
//Require, import also available
const effectsdk = require('@effectai/effect-js');
const client = new effectsdk.EffectClient('testnet')

// Instantiating bsc account.
const account = effectsdk.createAccount(
    // leave empty to generate new private key, or use existing private
    'YourVeryPrivateKeyHere'
)

// Generate web3 instance from account with private key.
// Could also be the web3 object with a MetaMask connection etc.
const web3 = effectsdk.createWallet(account)

const main = async () => {
    // Connect web3 account to SDK
  const effectAccount = await client.connectAccount(web3);

  const newCampaign = {
      title: 'Random Title',
      description: 'Networked well-modulated instruction set',
      instructions: `American whole magazine truth stop whose.`,
      template: `<div>
                <image src='` + '${image_url}' + `'></image>
                <h2>What do you see in the picture above? 🐸</h2>
                <input type='radio' name='radio-answer' id="original" label=''>Stars 🤩</input><br>
                <input type='radio' name='radio-answer' id="original" label=''>Mechanical Turk 😏</input><br>
                <input type='radio' name='radio-answer' id="original" label=''>Dog 🤐</input> <br>
                <input type='radio' name='radio-answer' id="original" label=''>Cat 😵</input><br>
                <hr>
                <button type="submit">Submit</button> 
              </div>
              <script></script>
              <style></style>`,      
      image: 'https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4',
      category: 'Image Labeling',
      example_task: {'image_url': 'https://ipfs.effect.ai/ipfs/bafkreidrxwhqsxa22uyjamz7qq3lh7pv2eg3ykodju6n7cgprmjpal2oga'},
      version: 1,
      reward: 10
  }

  // Create campaign.
  // campaign object, reward efx per task
  const makeCampaign = await client.force.makeCampaign(newCampaign, '10')
  console.log('makeCampaign', makeCampaign)

  // Get Campaigns
  // nextKey, limit
  const campaigns = await client.force.getMyLastCampaign()
  console.log('Campaigns', campaigns)
}

main()

```

# 🦋 Development
The best way to get to know how this module works is by adding features while you can run it. So there are some examples provided to provide an idea of how to create a transaction with the Effect Network.

Clone the project
```bash
git clone git@github.com:dfuse-io/client-js.git
```
Install dependencies and dev-dependencies
```bash
npm install
```
It is now possible to start compiling the typescript files to the module spec of your choice, for now, the following module specs are supported: [ESM, CommonJS, UMD]
```bash
npm run build:cjs # commonjs
npm run build:esm # esm
npm run build:umd # umd
```
Link it. Now it is possible to use `npm link` in order to link the compiled typescript code to your own project, from the directory of your project, run the following command.
```bash
npm link /path/to/effect-js/
```
From your project folder, you should be able to import the compiled code from `effect-js`. Depending on your environment, use `import` or `require` as needed.

# 🧪 Testing
The testing framework used for this project is [Jest](https://jestjs.io/docs/api). It is possible to run the tests with the following command. The tests are available in the `test` directory. 
Remember to copy the `.env.test.example` file to `.env.test` and fill in the values for your environment.

Run the tests in the `test` directory with the `kylin` environment, for now it is configured to only run unit tests. 
```bash
npm run test
```

For more fine grained control of the test execution, you can use the following command.
```bash
# Run all tests and watch
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run unit tests
npm run test:unit
```



# 🗞 Publishing
Run the following command to build the source, increment the version, and publish the `dist` transpiled code and types to the npm repository, assuming you have the correct credentials.

Make sure the git is clean, and everything has been committed, and run the following.
```bash
npm run publish:public
```
Running `publish:next` will publish a pre-release of the sdk to the npm repository. Users will need to explicitly opt-in in order to use it.
```bash
npm run publish:next
```


