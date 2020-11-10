/**
 * @description webpackage 配置文件
 * @author wenduo
 */
const path = require("path");
module.exports = {
  entry: require("./entry").entry,
  output: require("./output").output,
  module: require("./loader").module,
  plugins: require("./plugins").plugins,
  devServer: require("./server").devServer,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    // alias: {
    //   "@": path.join(__dirname, "../src"), // 这样@符号就表示项目根目录中src这一层路径
    // },
  },
};
