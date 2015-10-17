import 'angular'

import newsListCtrl from 'controller/home/news/list.es6'
import newsListTemplate from 'template/home/news/list.html'

//import children state and initialize

module.exports = function (app) {
  newsListCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.news.list', {
        url: 'list/:pageCnt',
        views: {
          
          'right@home': {
            controller: 'newsListCtrl',
            template: newsListTemplate
          }
        }
        
      })
      
    }
  ]);
}