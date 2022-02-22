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
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
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
    static: {
      directory: BUILD_DIR,
      watch: true,
    },
    open: true
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].[fullhash].js',
    library: '[name]'
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : false,

  plugins,

  optimization: {
    emitOnErrors: false,
  },

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
                path.join(SRC_DIR, 'partials')
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
