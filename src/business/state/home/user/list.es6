import 'angular'

import userListCtrl from 'controller/home/user/list.es6'
import userListTemplate from 'template/home/user/list.html'

//import children state and initialize

module.exports = function (app) {
  userListCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.user.list', {
        url: 'list/',
        views: {
          
          'right@home': {
            controller: 'userListCtrl',
            template: userListTemplate
          }
        }
        
      })
      
    }
  ]);
}