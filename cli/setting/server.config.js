const { proxy, port } = require("./wm-config");
const { NODE_ENV } = process.env;
const path = require("path");
const proxyPathObj = proxy[NODE_ENV];
module.exports = {
  host: "127.0.0.1",
  port, // 设置启动端口,
  distPath: path.join(__dirname, "dist"), // 设置静态访问文件路径
  historyApiFallback: true, // 重定向
  webpackDevMiddleware: {
    noInfo: true, // 显示无信息到控制台（仅警告和错误）
    quiet: true, // 向控制台显示任何内容
    // lazy: true, // 切换到延迟模式 // 这意味着没有观看，而是重新编译每个请求
    // watchOptions: { aggregateTimeout: 300, poll: true }, // watch options (only lazy: false)
    // publicPath: publicPath, //绑定中间件的公共路径,与webpack配置的路径相同
    index: "index.html", // Web服务器的索引路径，默认为“index.html”。
    // 如果falsy（但不是未定义），服务器将不会响应到根URL的请求。
    // headers: { "X-Custom-Header": "yes" }, // 自定义标题
    // mimeTypes: { "text/html": [ "phtml" ] }, // 添加自定义mime /扩展映射
    // https://github.com/broofa/node-mime#mimedefine
    // https://github.com/webpack/webpack-dev-middleware/pull/150
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      assets: false,
      builtAt: false,
      entrypoints: false,
    }, // 用于形成统计信息的选项
    // reporter: null, // 提供自定义记录器来更改日志显示的方式。
    // serverSideRender: false, // 关闭服务器端渲染模式。有关详细信息，请参阅服务器端渲染部分。
  },
  webpackHotMiddleware: {
    middleware: {
      log: false,
      // path: "/__what",
      heartbeat: 2000,
    },
    config: {
      // path: , // 中间件在其上服务事件流的路径
      // name: , // 包名称，专门用于多编译器模式
      timeout: 1000, // 断开连接后等待重新连接的等待时间
      // overlay: true, // 设置为false可禁用基于DOM的客户端覆盖
      reload: true, // 设置为true可以热更新代码
      noInfo: true, // 设置为true以禁用信息性控制台日志记录
      quiet: true, // 设置为true以禁用所有控制台日志记录
      // dynamicPublicPath: true, // 设置为true以将webpack publicPath用作路径的前缀
      // autoConnect: , // 设置为false可用于防止从客户端到Webpack后端的连接自动打开-如果需要使用setOptionsAndConnect函数修改选项，则为理想选择
      ansiColors: {}, // 一个自定义客户端覆盖颜色的对象，如ansi-html包中所述。
      overlayStyles: {}, // 一个对象，可让您覆盖或向客户端覆盖div添加新的内联样式。
      overlayWarnings: true, // 设置为true可以启用客户端除警告外还覆盖警告。
    },
  },
  proxy: {
    from: proxyPathObj.from,

    to: proxyPathObj.to,
    secure: proxy.secure,
    changeOrigin: proxy.changeOrigin,
    pathRewrite: proxy.pathRewrite,
  },
};
