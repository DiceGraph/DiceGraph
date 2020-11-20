const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = exports = module.exports = {
  entry: './source/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'index.min.js',
    library: 'DiceGraph',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(process.cwd(), 'lib/'),
  },
};