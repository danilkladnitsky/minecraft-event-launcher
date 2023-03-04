const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
require('dotenv').config({
    path: '.env',
});
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: {
    app: [
        path.resolve(__dirname, "src", "index.tsx"),
        path.resolve(__dirname, "src", "index.scss")
    ],
  },
  context: path.join(__dirname, "src"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "variables.scss";`,
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new CleanWebpackPlugin(),
    new DotenvPlugin({
        path: '.env',
        sample: '.env.example',
        allowEmptyValues: true,
    })
  ],
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true,
    public: `localhost:3000`,
  },
};
