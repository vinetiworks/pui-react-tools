'use strict';

var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

var _require = require('./webpack.plugins'),
    noErrors = _require.noErrors;

var _require2 = require('../assets/config'),
    assetHost = _require2.assetHost,
    assetPort = _require2.assetPort;

var publicPath = assetHost ? '//' + assetHost + ':' + assetPort + '/' : '/';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    application: ['./app/components/application.js', 'webpack-hot-middleware/client?path=' + (publicPath + '__webpack_hmr')]
  },
  externals: null,
  module: {
    loaders: [{ test: [/\.png(\?|$)/, /\.gif(\?|$)/, /\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.jpe?g(\?|$)/], loader: 'url' }, { test: [/\.svg(\?|$)/], include: /node_modules/, loader: 'url' }, { test: /\.css$/, exclude: /typography/, loaders: ['style', 'css?sourceMap'] }, { test: /\.css$/, include: /typography/, loaders: ['style', 'css'] }, { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] }, { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: __dirname,
    pathinfo: true,
    publicPath: publicPath
  },
  plugins: [new HotModuleReplacementPlugin(), noErrors],
  watch: true
};