import 'angular'
import 'angular-cookies'
import 'angular-ui-router'

"use strict";

var app = angular.module('knewsAdmin', [
  'ui.router',
  'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
    //更改ng模板标记，解决与xtpl的冲突
    //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/')
    //$urlRouterProvider.when('/', 'home')
    //$stateProvider
      
    $locationProvider.html5Mode(false);
  }
]);

module.exports = app;
