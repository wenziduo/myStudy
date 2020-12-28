/**
 * @description webpackage 配置文件（production）
 * @author wenduo
 */

const path = require('path');
const osSize = require('os').cpus().length; // 获取计算机核数
const webpack = require('webpack');
const HappyPack = require('happypack'); // 导入多线程打包
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: osSize >= 8 ? 8 : osSize }); // 创建一个 HappyThreadPool，作为所有 loader 共用的线程池
const { indexHTML, srcPath, indexJS, distPath, publicPath, antdComponentsPath } = require('../commonPath');
const antdTheme = require('../antd-theme'); // antd 风格配置
module.exports = {
  output: {
    path: distPath,
    publicPath, // 地址添加前缀
    // filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 匹配js、jsx、ts、tsx文件
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.less$/, // 匹配less文件
        use: 'happypack/loader?id=less',
      },
      {
        test: /\.css$/, // 匹配css文件
        use: 'happypack/loader?id=css',
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // 匹配图片文件
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    // 复制插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../../public'),
          to: path.join(__dirname, '../../dist/public'),
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
    // html 插件
    new HtmlWebpackPlugin({
      template: indexHTML,
    }),
    new HappyPack({
      id: 'js',
      threads: osSize,
      threadPool: happyThreadPool, // 用于检索工作线程的预定义线程池
      verbose: true, // 是否允许 HappyPack 输出日志
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
            compact: true,
          },
        },
        // {
        //   loader: require.resolve('eslint-loader'),
        // }
      ],
    }),
    new HappyPack({
      id: 'css',
      threads: osSize,
      threadPool: happyThreadPool, // 用于检索工作线程的预定义线程池
      verbose: true, // 是否允许 HappyPack 输出日志
      loaders: ['style-loader', 'css-loader'],
    }),
    new HappyPack({
      id: 'less',
      threads: osSize,
      threadPool: happyThreadPool, // 用于检索工作线程的预定义线程池
      verbose: true, // 是否允许 HappyPack 输出日志
      loaders: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: antdTheme,
            },
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      NICE_FEATURE: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProgressPlugin(), // 显示打包进度
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': srcPath, // 这样@符号就表示项目根目录中src这一层路径
      '@antd': antdComponentsPath, // antd路径
    },
  },
};
