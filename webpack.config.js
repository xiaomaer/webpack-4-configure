// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
    //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses. Enable this by passing:
    historyApiFallback: true

  },
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // 清空dist文件
    new CleanWebpackPlugin('dist', {}),
    // 抽取出css文件，结合WebpackMd5Hash，使得js变化时，只有js文件hash发生变化；css变化时，只有css文件hash发生变化
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    // 生成包含js，css引用的html
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    // hash
    new WebpackMd5Hash(),
  ]
};
