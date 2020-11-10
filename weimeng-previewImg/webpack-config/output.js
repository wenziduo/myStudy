/**
 * @description webpackage 出口配置
 * @author wenduo
 */

const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, '../build'),
    filename: "index.js",
    libraryTarget: 'commonjs2' //注意：记得设置commonjs2
    // publicPath: '/outputdist/', // 地址添加前缀
  },
};
