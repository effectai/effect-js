# effect-js 🔥🔥🔥

Javascript SDK for integration with [https://effect.network](https://effect.network)  
You can take a look at our docs at the following link: [Docs](https://effectai.github.io/developer-docs/)  
The SDK reference is available here: [SDK-Reference](https://effectai.github.io/effect-js/)  

# ✒️ Installation

The official distribution for the package can is available at npm. [npm](https://www.npmjs.com/package/effect-js)

```
npm i @effectai/effect-js
```

# Quick start
```javascript
//Require, import also available
const effectsdk = require('@effectai/effect-js');
const client = new effectsdk.EffectClient('testnet')

// Instantiating bsc account.
const account = effectsdk.createAccount(
    // leave empty to generate new private key, or use existing private
    '0x6f46d8d7c9684ed049c941758cb9186eb2b5758221a229e27861fe357edb770d'
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
      template: `<div id="task">
                  <image src='` + '${image_url}' + `'></image>
                  <h2>Image Classification</h2>
                  <option submit name="button-answer" type="button" 
                    :options="['Cat','Dog','Mechanical Turk','Other']" 
                    label="What do you see in the picture above?">
                  </option>
                </div>`,
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

# Development
The best way to get to know how this module works is by adding features while you can run it. So there are some examples provided to provide an idea of how to create a transaction with the Effect Network.

Clone the project
```
git clone git@github.com:dfuse-io/client-js.git
```
Install dependencies and dev-dependencies
```
npm install
```
It is now possible to start compiling the typescript files to the module spec of your choice, for now, the following module spec's are supported: [ESM, CommonJS, UMD]
```
npm run build:cjs # commonjs
npm run build:esm # esm
npm run build:umd # umd
```
Link it. Now it is possible to use `npm link` in order to link the compiled typescript code to your own project, from the directory of your project, run the following command.
```
npm link /path/to/effect-js/
```
From your project folder, you should be able to import the compiled code from `effect-js`. Depending on your environment, use `import` or `require` as needed.

# Publishing
Run the following command to build the source, increment the version, and publish the `dist` transpiled code and types to the npm repository, assuming you have the correct credentials.

Make sure the git is clean, and everything has been committed, and run the following.
```
npm run publish:public
```
Running `publish:next` will publish a pre-release of the sdk to the npm repository. Users will need to explicitly opt-in in order to use it.
```
npm run publish:next
```


