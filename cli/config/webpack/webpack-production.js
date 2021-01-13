/**
 * @description webpackage 配置文件（production）
 * @author wenduo
 */

const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { indexJS } = require('../commonPath');

module.exports = merge(webpackCommon, {
  entry: [indexJS],
  plugins: [
    // 复制插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootPath, '/public'),
          to: path.join(rootPath, '/dist/public'),
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
    // 清除已经打包的文件
    new CleanWebpackPlugin(),
    // 压缩代码
    // new UglifyJSPlugin({
    //   parallel: true,
    // }),
    // 抽离样式
    // new ExtractTextPlugin('style.css'),
  ],
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    sideEffects: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          ecma: 8,
          mangle: true,
          keep_fnames: true,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      }),
    ],
  },
});
