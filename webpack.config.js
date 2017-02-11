const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_PROD = process.env.NODE_ENV === 'production';

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

console.log(`IS_PROD: ${IS_PROD}`);

const config = {
  context: SRC_DIR,

  entry: './app.js',

  output: {
    path: DIST_DIR,
    filename: `bundle${IS_PROD ? '-[hash].min' : ''}.js`,
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          SRC_DIR
        ],
        exclude: [
          NODE_MODULES_DIR
        ],
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        include: [
          SRC_DIR
        ],
        exclude: [
          NODE_MODULES_DIR
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  devServer: {
    contentBase: DIST_DIR
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: `vendor${IS_PROD ? '-[hash].min' : ''}.js`,
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin(`styles${IS_PROD ? '-[hash].min' : ''}.css`)
  ]
};

if (IS_PROD) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]);
} else {
  config.devtool = 'inline-source-map';
}

module.exports = config;
