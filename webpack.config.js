const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
});
const copyCSS = new CopyPlugin([{ from: "./src/styles.css", to: "." }]);

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    hot: true,
  },
  devtool: "source-map",
  entry: {
    main: "./src/app.tsx",
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  plugins: [htmlPlugin, copyCSS],
};
