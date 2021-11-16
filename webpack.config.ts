import path from "path";
import GasPlugin from "gas-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  cache: true,
  context: __dirname,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "Code.gs",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/appsscript.json",
          to: "appsscript.json",
        },
      ],
    }),
    new GasPlugin(),
  ],
};
