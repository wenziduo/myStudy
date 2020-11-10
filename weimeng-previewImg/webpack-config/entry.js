/**
 * @description webpackage 入口配置
 * @author wenduo
 */

const path = require("path");

module.exports = {
  entry: {
    entry: path.join(__dirname, "../lib/index.tsx"),
  },
};
