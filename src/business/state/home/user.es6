import 'angular'

import userLeftCtrl from 'controller/home/user/left.es6'
import userLeftTemplate from 'template/home/user/left.html'

import userEditState from 'state/home/user/edit.es6'
import userListState from 'state/home/user/list.es6'
//import children state and initialize

module.exports = function (app) {
  userLeftCtrl(app)
  
  userEditState(app)
  userListState(app)


  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      $urlRouterProvider.when("/user/","/user/list/")

      $stateProvider
      .state('home.user', {
        url: 'user/',
        views: {
          'left': {
            controller: 'userLeftCtrl',
            template: userLeftTemplate
          }
        }
        
      })
      
    }
  ]);
}