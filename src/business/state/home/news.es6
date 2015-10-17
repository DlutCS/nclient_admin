import 'angular'

import newsLeftCtrl from 'controller/home/news/left.es6'
import newsLeftTemplate from 'template/home/news/left.html'

import newsEditState from 'state/home/news/edit.es6'
import newsListState from 'state/home/news/list.es6'
import newsCreateState from 'state/home/news/create.es6'
//import children state and initialize

module.exports = function (app) {
  newsLeftCtrl(app)
  
  newsEditState(app)
  newsListState(app)
  newsCreateState(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      $urlRouterProvider.when("/news/","/news/list/")

      $stateProvider
      .state('home.news', {
        url: 'news/',
        views: {
          'left': {
            controller: 'newsLeftCtrl',
            template: newsLeftTemplate
          }
        }
        
      })
      
    }
  ]);
}