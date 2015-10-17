import 'angular'

import userEditCtrl from 'controller/home/user/edit.es6'
import userEditTemplate from 'template/home/user/edit.html'

//import children state and initialize

module.exports = function (app) {
  userEditCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.user.edit', {
        url: 'edit/',
        views: {
          
          'right@home': {
            controller: 'userEditCtrl',
            template: userEditTemplate
          }
        }
        
      })
      
    }
  ]);
}