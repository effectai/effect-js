# 🔥 @effectai/effect-js

<p align="center"><img src="https://effect.network/img/logo/logo.png" width="400px"></p>

Effect Network SDK for integration with [https://effect.network](https://effect.network)

## ✒️ Installation

The official distribution for the package can is available at [npm](https://www.npmjs.com/package/@effectai/effect-js).
Note that the module available under the `@effectai/effect-js` namespace is for ECMAScript modules, if you want to use the module in a CommonJS environment (require), you can use the `@effectai/effect-js@cjs` module.

### ESM

```bash
npm i @effectai/effect-js
```

```js
import { EffectSdk } from "@effectai/effect-js";
```

### CommonJS

```bash
npm i @effectai/effect-js@cjs
```

```js
const { EffectSdk } = require("@effectai/effect-js");
```

## Quickstart

Take a look at the quick start [guide](https://developer.effect.network/quickstart/) to understand how to install and use the library.

## SDK-Reference

The SDK reference is available here: [SDK-Reference](https://effectai.github.io/effect-js/)

## 🦋 Development

The best way to get to know how this module works is by adding features while you can run it. So there are some examples provided to provide an idea of how to create a transaction with the Effect Network.

Clone the project

```bash
git clone https://github.com/effectai/effect-js.git
```

Install dependencies and dev-dependencies

```bash
npm ci
```

It is now possible to start compiling the typescript files to the module spec of your choice, for now, the following module specs are supported: [ESM, CommonJS]

```bash
npm run build # esmodules
npm run build:cjs # commonjs
```

Link it. Now it is possible to use `npm link` to link the compiled typescript code to your project, from the directory of your project, run the following command.

```bash
npm link /path/to/effect-js/
```

From your project folder, you should be able to import the compiled code from `effect-js`. Depending on your environment, use `import` or `require` as [described above](## ✒️ Installation).

## 🧪 Testing

The testing framework used for this project is [ViTest](https://vitest.dev) and is configured to run the tests in the `test` directory.
Remember to copy the `test/.env.test.example` file to `test/.env.test` and fill in the values for your environment.

```bash
cp test/.env.test.example test/.env.test

npm run test
# OR
npm run test:watch
```

## 🗞 Publishing

Run the following command to build the source, increment the version, and publish the `dist` transpile code and types to the npm repository, assuming you have the correct credentials.

Make sure the git is clean, and everything has been committed, and run the following.

```bash
npm run publish:public
```

Running `publish:next` will publish a pre-release of the SDK to the npm repository. Users will need to explicitly opt-in to use it.

```bash
npm run publish:next
```
