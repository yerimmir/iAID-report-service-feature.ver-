const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
  if (target === "node") {
    return ["./src/App.tsx"];
  }
  return devMode
    ? [hotMiddlewareScript, "./src/index.tsx"]
    : ["./src/index.tsx"];
};

const getConfig = (target) => ({
  mode: devMode ? "development" : "production",

  name: target,

  target,

  entry: getEntryPoint(target),

  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: "[name].js",
    publicPath: "/web/",
    libraryTarget: target === "node" ? "commonjs2" : undefined,
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
    extensions: [".ts", ".tsx", ".js", ".scss", ".jsx"],
    alias: {
      assets: path.resolve("src/assets"),
      components: path.resolve("src/components"),
      middleware: path.resolve("src/middleware"),
      models: path.resolve("src/models"),
      modules: path.resolve("src/modules"),
      routes: path.resolve("src/routes"),
    },
    modules: [path.join(__dirname, "src"), "node_modules"],
    fallback: {
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      buffer: require.resolve("buffer"),
      asset: require.resolve("assert"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },

  plugins:
    target === "web"
      ? [
          new LoadablePlugin(),
          new MiniCssExtractPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [new LoadablePlugin(), new MiniCssExtractPlugin()],

  externals:
    target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
});

// for server side rendering
module.exports = [getConfig("web"), getConfig("node")];
