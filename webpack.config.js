const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.[contenthash:8].js",
    assetModuleFilename: path.join("assets", "images/[name][ext]"),
    assetModuleFilename: path.join("assets", "fonts/[name][ext]"),
    assetModuleFilename: path.join("assets", "icons/[name][ext]"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              import: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|svg|png)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets", "icons/[name][ext]"),
        },
      },
      {
        test: /\.mp3$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets", "audio/[name][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets", "fonts/[name][ext]"),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash:8].css",
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};
