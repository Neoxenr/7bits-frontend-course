const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = `${__dirname}/src`;
const BUILD_DIR = `${__dirname}/build`;
const PUBLIC_DIR = `${__dirname}/public`;

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(PUBLIC_DIR, 'index.html')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[fullhash].css'
  })
];

module.exports = {
  mode: 'none',

  entry: {
    app: path.join(SRC_DIR, '/index.js')
  },

  devServer: {
    contentBase: PUBLIC_DIR,
    watchContentBase: true,
    inline: true,
    open: true
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].[fullhash].js',
    library: '[name]'
  },

  watch: NODE_ENV === 'development',

  devtool: NODE_ENV === 'development' ? 'source-map' : false,

  plugins,

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              partialDirs: [
                path.join(SRC_DIR, 'components'),
                path.join(SRC_DIR, 'layouts')
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  }
};
