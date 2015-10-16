'use strict';

var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcBase = path.resolve(__dirname, 'src/' ),
    buildBase = path.resolve( __dirname, 'build/' );


module.exports = {
  resolve: {
    alias: {
      'angular': srcBase + '/lib/angular/angular.js',
      'angular-cookies': srcBase + '/lib/angular/angular-cookies.js',
      'angular-ui-router': srcBase + '/lib/angular/angular-ui-router.js',
      'template': srcBase + '/business/template/',
      'controller': srcBase + '/business/controller/',
      'service': srcBase + '/business/service/',
      'state': srcBase + '/business/state/',
      'directive': srcBase + '/business/directive/',
      'app': srcBase + '/business/app/',
      'style': srcBase + '/style/'
    }
  },
  entry: {
      'hot': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:9090'],
      'admin': srcBase + '/business/admin.es6',
      'foundation': srcBase + '/lib/foundation/foundation.es6'
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
      /*,
      new CommonsChunkPlugin('common', 'common.js', ['index', 'news', 'login'])
      */
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
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader!postcss-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
    },
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=16384'
    }]
  },
  externals:{
    /*'angular': true*/
  },
  output: {
      path: buildBase,
      filename: '[name].bundle.js',
      publicPath: "http://localhost:9090/"
  },
  debug: true
};
