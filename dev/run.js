/**
 * Created by work on 17/7/13.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'whatwg-fetch',
      './dev/index.js'
    ]
  },
  debug: true,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: 'dev/index.ejs',
      filename: 'index.html',
      chunks: ['home']
    }),
    // new CopyWebpackPlugin([
    //   { from: './assets/' }
    // ]),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../dev')]
      },
      {
        test: /\.css?$/,
        exclude: [path.join(__dirname, "../src")],
        loaders: ['style', 'css']
      },
      {
        test: /\.css?$/,
        include: [path.join(__dirname, "../src")],
        loaders: ['style?sourceMap',
          'css?-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {test: /\.(jpg|png)$/, loader: 'url?limit=8192'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10240&mimetype=image/svg+xml'},
      {test: /\.(woff)$/, loader: 'url-loader?limit=10000'}
    ]
  },
  postcss: [autoprefixer({ browsers: ['> .01%', 'iOS >= 6'] })]
};