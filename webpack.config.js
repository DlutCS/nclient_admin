'use strict';

var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

var srcBase = path.resolve(__dirname, 'src/' ),
    buildBase = path.resolve( __dirname, 'build/' );


module.exports = {
  resolve: {
    alias: {
      'angular': srcBase + '/lib/angular/angular.js',
      'angular-cookies': srcBase + '/lib/angular/angular-cookies.js',
      'angular-ui-router': srcBase + '/lib/angular/angular-ui-router.js',
      'ueditor': srcBase + '/lib/ueditor/ueditor.es6',
      'template': srcBase + '/business/template/',
      'controller': srcBase + '/business/controller/',
      'service': srcBase + '/business/service/',
      'state': srcBase + '/business/state/',
      'directive': srcBase + '/business/directive/',
      'app': srcBase + '/business/app/',
      'style': srcBase + '/style/',
      'lib': srcBase + '/lib/'
    }
  },
  entry: {
      'hot': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:9090'],
      'admin': srcBase + '/business/admin.es6',
      'foundation': srcBase + '/lib/foundation/foundation.es6',
      'vendor': [ 'ueditor' ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
      ,
      new CommonsChunkPlugin({
        name: 'vendor', 
        minChunks: Infinity
      })
      ,
      new UglifyJsPlugin({
        mangle: {
          except: ['$super', '$', 'module', 'exports', 'require', 'angular'],

        },
        exclude: /vendor/i,
        compress: {
          warnings: false
        }
      })
    ],
    module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.es6$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader!less-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!postcss-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader!sass-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
    },
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.(png|jpg|gif)$/, 
      loader: 'url-loader?limit=24000'
    }]
  },
  externals:{
    'angular': true
  },
  output: {
      libraryTarget: 'this',
      path: buildBase,
      filename: '[name].bundle.js',
      publicPath: "http://localhost:9090/"
  },
  debug: true
};
