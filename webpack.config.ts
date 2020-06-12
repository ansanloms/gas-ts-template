const path = require("path");
const GasWebpackPlugin = require("gas-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  // 起点となるファイル
  entry: "./src/main.ts",

  // webpack watch したときに差分ビルドができる
  cache: true,

  // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
  output: {
    path: path.join(__dirname, "dist"),
    filename: "Code.gs",
  },

  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      {
        // コンパイルの事前に eslint による
        test: /\.ts$/,
        // 事前処理であることを示す
        enforce: "pre",
        // TypeScript をコードチェックする
        loader: "eslint-loader",
      },
      {
        // 正規表現で指定する
        test: /\.ts$/,
        // ローダーの指定
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },

  // 処理対象のファイルを記載する
  resolve: {
    extensions: [
      ".ts",
      ".js", // node_modulesのライブラリ読み込みに必要
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: "src/appsscript.json",
        to: "appsscript.json"
      }]
    }),
    new GasWebpackPlugin()
  ],
};
