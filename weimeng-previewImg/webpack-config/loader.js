/**
 * @description webpackage loader配置
 * @author wenduo
 */

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配js、jsx文件
        exclude: /node_modules/,
        use: "Happypack/loader?id=js",
        // loader: "babel-loader",
        // query: {
        //   // plugins: ["transform-runtime"],
        //   // presets: ["es2015", "react", "stage-2"],
        //   presets: ["@babel/preset-env"],
        // },
      },
      {
        test: /\.css$/, // 匹配css文件
        // use: "Happypack/loader?id=css",
        loader: "style-loader!css-loader",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
};
