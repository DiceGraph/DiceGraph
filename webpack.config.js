const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = exports = module.exports = {
  entry: './source/index.ts',
  plugins: [new BundleAnalyzerPlugin({ analyzerPort: 8987 })],
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
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};