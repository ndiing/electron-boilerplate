// const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');
const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },

  // output: { devtoolModuleFilenameTemplate: '[absolute-resource-path]' },
  // // module: {
  // //   rules: [
  // //     ...rules,
  // //     {
  // //       test: /\.css$/,
  // //       use: [
  // //         {
  // //           loader: 'style-loader',
  // //         },
  // //         {
  // //           loader: 'css-loader',
  // //         }
  // //       ],
  // //     },
  // //   ],
  // // },
  // plugins: [new BytenodeWebpackPlugin({ compileForElectron: true })],
  // target: 'electron-renderer'
};
