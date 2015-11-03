import 'angular'

import controlLeftCtrl from 'controller/home/control/left.es6'
import controlLeftTemplate from 'template/home/control/left.html'

import controlScrapyState from 'state/home/control/scrapy.es6'

//import children state and initialize

module.exports = function (app) {
  controlLeftCtrl(app)
  
  controlScrapyState(app)


  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      $urlRouterProvider.when("/control/","/control/scrapy/")

      $stateProvider
      .state('home.control', {
        url: 'control/',
        views: {
          'left': {
            controller: 'controlLeftCtrl',
            template: controlLeftTemplate
          }
        }
        
      })
      
    }
  ]);
}