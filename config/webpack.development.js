const path = require('path');
const resolveApp = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  target: 'web',
  devServer: {
    hot: true,
    port: 3000,
    open: false,
    compress: true,
    historyApiFallback: true,
    static: {
      directory: resolveApp('public'),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new ReactRefreshWebpackPlugin(),

  ],
};
