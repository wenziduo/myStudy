/**
 * @description webpackage 插件配置
 * @author wenduo
 */

 
const osSize = require('os').cpus().length; // 获取计算机核数
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const Happypack = require("happypack"); // 导入多线程打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const happyThreadPool = Happypack.ThreadPool({ size: osSize }); // 创建一个 HappyThreadPool，作为所有 loader 共用的线程池

module.exports = {
  plugins: [
    // html 插件
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "../public/index.html"),
    // }),
    // js声明多线程打包
    new Happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
      threadPool: happyThreadPool, // 用于检索工作线程的预定义线程池
      verbose: true, // 启用此选项可将状态消息从HappyPack记录到STDOUT
    }),
    //css 多线程打包
    // new Happypack({
    //   id: "css",
    //   use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
    //   threadPool: happyThreadPool, // 用于检索工作线程的预定义线程池
    //   verbose: true, // 启用此选项可将状态消息从HappyPack记录到STDOUT
    // }),
  ],
};
