import 'angular'

import loginCtrl from 'controller/login.es6'
import loginTemplate from 'template/login.html'
import footerTemplate from 'template/footer.html'
//import children state and initialize

export default function (app) {
  loginCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      

      $stateProvider
      .state('login', {
        url: '/login/',
        views: {
          'main': {
            controller: 'loginCtrl',
            template: loginTemplate
          },
          'footer': {
            template: footerTemplate
          }
        }
        
      })
      
    }
  ]);
}