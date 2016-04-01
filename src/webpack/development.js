const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const {noErrors} = require('./webpack.plugins');

const assetHost = 'http://localhost';
const assetPort = 3001;
const publicPath = `${assetHost}:${assetPort}/`;
//TODO deal with case with no asset server

module.exports = {
  devtool: 'source-map',
  entry: {
    application: ['./app/components/application.js', `webpack-hot-middleware/client?path=${`${publicPath}__webpack_hmr`}`]
  },
  externals: null,
  module: {
    loaders: [
      {test: [/\.svg(\?|$)/, /\.png(\?|$)/, /\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.jpe?g(\?|$)/], include: /node_modules/, loader: 'file?name=[name]-[hash].[ext]'},
      {test: /\.css$/, exclude: /typography/, loaders: ['style', 'css?sourceMap']},
      {test: /\.css$/, include: /typography/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: __dirname,
    pathinfo: true,
    publicPath
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    noErrors
  ],
  watch: true
};