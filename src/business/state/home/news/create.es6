import 'angular'

import newsEditCtrl from 'controller/home/news/edit.es6'
import newsEditTemplate from 'template/home/news/edit.html'

//import children state and initialize

module.exports = function (app) {
  newsEditCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.news.create', {
        url: 'create/',
        views: {
          
          'right@home': {
            controller: 'newsEditCtrl',
            template: newsEditTemplate
          }
        }
      })
      
    }
  ]);
}