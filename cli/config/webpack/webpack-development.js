/**
 * @description webpackage 配置文件（development）
 * @author wenduo
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common');
const { indexJS } = require('../commonPath');
const { stringify } = require('qs');
const { webpackHotMiddleware } = require('../../setting/server.config');
module.exports = merge(webpackCommon, {
  entry: ['webpack-hot-middleware/client?' + stringify(webpackHotMiddleware.config), indexJS],
  plugins: [
    new webpack.DefinePlugin({
      NICE_FEATURE: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.HotModuleReplacementPlugin(), // 启动HMR
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
  ],
  mode: 'development',
  devtool: 'inline-source-map',
});
