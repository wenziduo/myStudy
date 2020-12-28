const path = require('path');
module.exports = {
  publicPath: '/', // 服务器部署目录
  distPath: path.resolve(__dirname, '..', 'dist'), // 导出到目录
  rootPath: path.resolve(__dirname, '..'), // 项目根目录
  srcPath: path.resolve(__dirname, '..', 'src'), // 源码目录
  antdComponentsPath: path.join(__dirname, '..', 'src', 'components', 'antd-components'), // 源码目录
  libPath: path.resolve(__dirname, '..', 'node_modules'), // node_modules
  indexHTML: path.join(__dirname, '..', 'src', 'index.ejs'), // html 入口
  indexJS: path.join(__dirname, '..', 'src', 'index.js'), // js 入口
  staticDir: path.join(__dirname, '..', 'public'), // 静态资源
};
