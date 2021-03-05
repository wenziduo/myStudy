const path = require("path");
const {
  currentPath,
  entryPath,
  outPath,
  htmlPath,
  srcPath,
} = require("../setting/wm-config");
module.exports = {
  publicPath: "/", // 服务器部署目录
  // distPath: path.resolve(__dirname, '..', 'dist'), // 导出到目录
  distPath: path.resolve(currentPath, outPath), // 导出到目录
  rootPath: path.resolve(currentPath), // 项目根目录
  srcPath: path.resolve(currentPath, srcPath), // 源码目录
  antdComponentsPath: path.join(
    currentPath,
    "src",
    "components",
    "antd-components"
  ), // 源码目录
  libPath: path.resolve(currentPath, "node_modules"), // node_modules
  indexHTML: path.join(currentPath, htmlPath), // html 入口
  indexJS: path.join(currentPath, entryPath), // js 入口
  // staticDir: path.join(currentPath, 'public'), // 静态资源
};
