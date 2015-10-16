import 'angular'


'use strict';

export default function (app) {

    app.controller('homeCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q) {
            console.log('home controller');
            
            //login.needLogin()

            console.log('用一个service进行login校验，不行跳到 login')
            
            $scope.config = {
              showHeader: false,
              route: $state.current.name.split('.'),
              routeParam: $state.params,
              header: 
              [{
                'route':'user', 
                'name':'用户'
              },{
                'route':'category', 
                'name':'类目'
              },{
                'route':'news', 
                'name':'新闻'
              }]
            }
           
            $rootScope.$on('$stateChangeSuccess', 
            function(e, tos, top, froms, fromp){

              $scope.config.route = tos.name.split('.')
              $scope.config.routeParam = top
            })

        }
    ]);
};
