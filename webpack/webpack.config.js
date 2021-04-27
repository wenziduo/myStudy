const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const publicPath = path.join(__dirname, "public");
console.log("publicPath", publicPath);
//检查某个目录是否存在
fs.stat(publicPath, function(stat) {
  console.log('stat', stat);
  if (stat.isDirectory()) {
    console.log('success **************')
    webpackObj.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "/public"),
            to: path.join(__dirname, "/dist/public"),
            globOptions: {
              ignore: [".*"],
            },
          },
        ],
      })
    );
  }
});

const webpackObj = {
  mode: "production",
  entry: {
    main: path.join(__dirname, "entry1.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:5].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new CopyPlugin({
    patterns: [
      {
        from: path.join(__dirname, "/public"),
        to: path.join(__dirname, "/dist/public"),
        globOptions: {
          ignore: [".*"],
        },
      },
    ],
  })],
  optimization: {
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
  },
};

module.exports = webpackObj;
