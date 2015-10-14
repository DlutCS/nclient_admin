import 'angular'

import homeCtrl from 'controller/home.es6'
import homeTemplate from 'template/home.html'
import footerTemplate from 'template/footer.html'

//import children state and initialize
import userState from 'state/home/user.es6'
import categoryState from 'state/home/category.es6'
import newsState from 'state/home/news.es6'

import 'style/home.scss'

export default function (app) {
  homeCtrl(app)

  userState(app)
  categoryState(app)
  newsState(app)

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
      //更改ng模板标记，解决与xtpl的冲突
      //$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
      $urlRouterProvider.when("/","/news/")

      $stateProvider
      .state('home', {
        url: '/',
        views: {
          'main': {
            controller: 'homeCtrl',
            template: homeTemplate
          },
          'footer': {
            template: footerTemplate
          }
        }
        
      })
      
    }
  ]);
}