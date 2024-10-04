const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  target: "node",

  node: false, // it enables '__dirname' in files. If is not, '__dirname' always return '/'.

  entry: {
    server: "./src/server.ts",
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
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

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".jsx"],
    alias: {
      assets: path.resolve("src/assets"),
      components: path.resolve("src/components"),
      middleware: path.resolve("src/middleware"),
      models: path.resolve("src/models"),
      modules: path.resolve("src/modules"),
      routes: path.resolve("src/routes"),
    },
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],

  externals: [nodeExternals()],
};
