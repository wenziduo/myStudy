/**
 * @description webpackage 服务配置
 * @author wenduo
 */

const path = require("path");

module.exports = {
  devServer: {
    hot: true, // 热更新
    open: false, // 默认打开窗口
    port: 7006, // 端口
    compress: true, // 压缩
    // publicPath: '/aaa/', // dev 添加前缀
    // contentBase: path.join(__dirname, "../dev-server"), // 默认本地服务器所在的根目录
    clientLogLevel: "warning",
    quiet: true, // 控制台log
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: /.*/,
    //       to: path.posix.join(__dirname, "../dist/index.html"),
    //     },
    //   ],
    // },
    historyApiFallback: true,
    overlay: { // 编译器错误或警告时，在浏览器中显示全屏覆盖
      warnings: true,
      errors: true
    },
    // headers: { // 请求的响应头
    //   'X-Custom-Foo': 'bar'
    // }
    // proxy: {
    //   // proxy URLs to backend development server
    //   "/api": "http://localhost:3000",
    // },
    // contentBase: path.join(__dirname, "dist"), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
};
