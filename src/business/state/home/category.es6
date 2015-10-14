import 'angular'

import categoryLeftCtrl from 'controller/home/category/left.es6'
import categoryLeftTemplate from 'template/home/category/left.html'

import categoryEditState from 'state/home/category/edit.es6'
import categoryListState from 'state/home/category/list.es6'
import categoryCreateState from 'state/home/category/create.es6'
//import children state and initialize

export default function (app) {
  categoryLeftCtrl(app)
  
  categoryEditState(app)
  categoryListState(app)
  categoryCreateState(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      $urlRouterProvider.when("/category/","/category/list/")

      $stateProvider
      .state('home.category', {
        url: 'category/',
        views: {
          'left': {
            controller: 'categoryLeftCtrl',
            template: categoryLeftTemplate
          }
        }
        
      })
      
    }
  ]);
}