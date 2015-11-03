import 'angular'

import controlScrapyCtrl from 'controller/home/control/scrapy.es6'
import controlScrapyTemplate from 'template/home/control/scrapy.html'

//import children state and initialize

module.exports = function (app) {
  controlScrapyCtrl(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      
      $stateProvider
      .state('home.control.scrapy', {
        url: 'scrapy/',
        views: {
          
          'right@home': {
            controller: 'controlScrapyCtrl',
            template: controlScrapyTemplate
          }
        }
        
      })
      
    }
  ]);
}