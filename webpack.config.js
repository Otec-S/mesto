const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },

  module: {
    rules: [
      // правила для обработки js, html и других файлов

      // добавьте ещё одно правило:
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ],
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
}
