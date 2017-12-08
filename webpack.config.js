const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const {NODE_ENV, PUBLIC_PATH} = process.env;

const IS_PROD = NODE_ENV === 'production';

const SRC_DIR = path.resolve('./src/');
const DIST_DIR = path.resolve('./dist/');
const NODE_MODULES_DIR = path.resolve('./node_modules/');

console.log(`IS_PROD: ${IS_PROD}`);
console.log(`PUBLIC_PATH: ${PUBLIC_PATH}`);

const loaders = {};
const plugins = {};

loaders.eslint = {
  test: /\.js$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  exclude: NODE_MODULES_DIR,
};

loaders.js = {
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: ['env'],
  },
  exclude: NODE_MODULES_DIR,
};

loaders.css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  }),
};

plugins.html = new HtmlWebpackPlugin({
  template: './index.html',
  title: 'dots-game',
  favicon: '../assets/favicon/favicon.ico',
});

plugins.commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: (module) => module.context && module.context.includes('node_modules'),
  filename: `vendor${IS_PROD ? '-[hash].min' : ''}.js`,
});

plugins.extractText = new ExtractTextPlugin({
  filename: `styles${IS_PROD ? '-[hash].min' : ''}.css`,
});

plugins.copy = new CopyWebpackPlugin([
  {
    from: '../assets/favicon/*',
    to: '[name].[ext]',
  },
]);

plugins.uglifyJs = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
});

plugins.hotModuleReplacement = new webpack.HotModuleReplacementPlugin();

plugins.dashboard = new DashboardPlugin();

const config = {
  context: SRC_DIR,

  entry: './app.js',

  output: {
    path: DIST_DIR,
    filename: `bundle${IS_PROD ? '-[hash].min' : ''}.js`,
    publicPath: PUBLIC_PATH,
  },

  module: {
    rules: [
      loaders.eslint,
      loaders.js,
      loaders.css,
    ],
  },

  resolve: {
    modules: [
      SRC_DIR,
      NODE_MODULES_DIR,
    ],
    extensions: [
      '.js',
      '.css',
      '.json',
    ]
  },

  plugins: [
    plugins.html,
    plugins.commonsChunk,
    plugins.extractText,
    plugins.copy,
  ].concat(IS_PROD
    ? [
      plugins.uglifyJs,
    ]
    : [
      plugins.hotModuleReplacement,
      plugins.dashboard,
    ]
  ),

  devServer: {
    contentBase: DIST_DIR,
    hot: true,
  },

  devtool: 'inline-source-map',
};

module.exports = config;
