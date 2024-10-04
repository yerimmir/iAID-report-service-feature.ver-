const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

// Fix: Webpack 에서 .env 파일 읽은 후 process.env에 병합
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".jsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: false,
    },
    alias: {
      assets: path.resolve("src/assets"),
      components: path.resolve("src/components"),
      models: path.resolve("src/models"),
      modules: path.resolve("src/modules"),
    },
  },
  module: {
    rules: [
      {
        // for image
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        // for jsx
        test: /\.(jsx)$/, // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
        exclude: /node_modules/, // node module 폴더는 babel 컴파일에서 제외
        use: ["babel-loader"],
      },
      {
        // for typescript
        test: /.(ts|tsx)$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // for scss
        test: /.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        // for font
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    // Fix: Webpack 에서 .env 파일 읽은 후 process.env에 병합
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devtool: "source-map",
};
