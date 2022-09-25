<p align="center"><img src="https://effect.network/img/logo/logo.png" width="400px"></p>


# 🔥 @effectai/effect-js 

Javascript SDK for integration with [https://effect.network](https://effect.network)  

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
Please take a look at the [Quick-Start-Guide](https://developer.effect.network/quickstart/) in order to understand how to install and use the library.
You can also take a look at our [Medium-Article](https://medium.com/effect-ai/launch-your-dapp-on-effect-network-eece1ba221f6) to get a quick overview of how to use the library on the dApp side. In other words: on how to post tasks to an already defined template on Effect Force.


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


