
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
       test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
       type: 'asset/resource',
      },
     {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
     },
     {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {targets: "defaults"}]
          ]
        }
      }
    }
    ],
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Путь к вашему шаблону HTML
      filename: 'index.html', // Имя выходного файла
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[fullhash].css',
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});