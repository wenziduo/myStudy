const path = require('path');
const { currentPath } = require('../setting/wm-config')
module.exports = {
  publicPath: '/', // 服务器部署目录
  distPath: path.resolve(currentPath, 'dist'), // 导出到目录
  rootPath: path.resolve(currentPath), // 项目根目录
  srcPath: path.resolve(currentPath, 'src'), // 源码目录
  antdComponentsPath: path.join(currentPath, 'src', 'components', 'antd-components'), // 源码目录
  libPath: path.resolve(currentPath, 'node_modules'), // node_modules
  indexHTML: path.join(currentPath, 'src', 'index.html'), // html 入口
  indexJS: path.join(currentPath, 'src', 'index.tsx'), // js 入口
  // staticDir: path.join(currentPath, 'public'), // 静态资源
};
