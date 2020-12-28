const express = require('express');
const colors = require('colors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack/webpack-development');
const historyApiFallback = require('connect-history-api-fallback');
const { createProxyMiddleware } = require('http-proxy-middleware');
const devConfig = require('../server.config');

const app = express();
const complier = webpack(webpackConfig);
console.log(colors.blue('当前环境：' + process.env.NODE_ENV));
// 配置proxy转发
if (devConfig.proxy) {
  app.use(
    createProxyMiddleware(devConfig.proxy.from, {
      target: devConfig.proxy.to,
      secure: devConfig.proxy.secure,
      changeOrigin: devConfig.proxy.changeOrigin,
      pathRewrite: devConfig.proxy.pathRewrite,
    }),
  );
}
// 重定向地址
if (devConfig.historyApiFallback) {
  app.use(
    historyApiFallback(devConfig.historyApiFallback === true ? { index: 'index.html' } : devConfig.historyApiFallback),
  );
}
// 使用 webpackDevMiddleware 中间件
app.use(webpackDevMiddleware(complier, devConfig.webpackDevMiddleware));
// 使用 webpackDevMiddleware 中间件
app.use(webpackHotMiddleware(complier, devConfig.webpackHotMiddleware));

// 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use(express.static(devConfig.distPath));

app.listen(devConfig.port, function () {
  console.log('project will running at ' + colors.blue('http://localhost:' + devConfig.port));
});
