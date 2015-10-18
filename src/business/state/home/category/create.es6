import 'angular'

import categoryEditCtrl from 'controller/home/category/edit.es6'
import categoryEditTemplate from 'template/home/category/edit.html'

//import children state and initialize

module.exports = function (app) {
  categoryEditCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.category.create', {
        url: 'create/',
        views: {
          
          'right@home': {
            controller: 'categoryEditCtrl',
            template: categoryEditTemplate
          }
        }
        
      })
      
    }
  ]);
}