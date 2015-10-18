import 'angular'

import categoryListCtrl from 'controller/home/category/list.es6'
import categoryListTemplate from 'template/home/category/list.html'

//import children state and initialize

module.exports = function (app) {
  categoryListCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.category.list', {
        url: 'list/',
        views: {
          
          'right@home': {
            controller: 'categoryListCtrl',
            template: categoryListTemplate
          }
        }
        
      })
      
    }
  ]);
}