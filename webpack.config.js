// import path from path;
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './dist/lib/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      resolve: {
        fullySpecified: false,
        extensions: ['.ts', '.tsx', '.js', '.json']
      },
      use: {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: ['process/browser']
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url"),
      "os": require.resolve("os-browserify/browser"),
      "zlib": require.resolve("browserify-zlib"),
      "buffer": require.resolve("buffer"),
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'effectsdk',
    globalObject: 'this',
    libraryTarget: 'umd'
  }
};