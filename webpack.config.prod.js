// webpack v4
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "hidden-source-map",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          mangle: {
            toplevel: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          autoprefixer: false,
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          // 多个css合并成一个
          name: "styles",
          test: /\.(scss|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // 清空dist文件
    new CleanWebpackPlugin("dist", {}),
    // 抽取出css文件，结合WebpackMd5Hash，使得js变化时，只有js文件hash发生变化；css变化时，只有css文件hash发生变化
    new MiniCssExtractPlugin({
      filename: "style.[contenthash:8].css"
    }),
    // 生成包含js，css引用的html
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    // hash
    new WebpackMd5Hash(),
    new webpack.NamedModulesPlugin()
  ]
};
