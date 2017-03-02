const BUILD_DIR = './build'

const exec = require('child_process').exec
const path = require('path')
const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackCopyPlugin = require('copy-webpack-plugin')

function NpmInstallPlugin () {}

NpmInstallPlugin.prototype.apply = (compiler) => {
  compiler.plugin('done', (compilation, callback) => {
    exec('npm install --production', {
      cwd: path.resolve(__dirname, BUILD_DIR)
    }, callback)
  })
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  externals: [{
    'firebase': true,
    'yargs': true
  }],
  target: 'node',
  plugins: [
    new WebpackCleanPlugin([BUILD_DIR]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new WebpackCopyPlugin([{
      from: '../config.json'
    }, {
      from: '../package.json'
    }]),
    new NpmInstallPlugin()
  ]
}
