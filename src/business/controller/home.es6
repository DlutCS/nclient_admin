import 'angular'


'use strict';

module.exports = function (app) {

    app.controller('homeCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q) {
            console.log('home controller');
            
            //login.needLogin()

            console.log('用一个service进行login校验，不行跳到 login')
            
            $scope.config = {
              showModal: false,
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
              },{
                'route':'control',
                'name':'管理'
              }]
            }
           
            $rootScope.$on('$stateChangeSuccess', 
            function(e, tos, top, froms, fromp){

              $scope.config.route = tos.name.split('.')
              $scope.config.routeParam = top
            })

            $scope.$on('homeListModalShow', function(e) {
              console.log('modal show')
              $scope.config.showModal = true;
              e.preventDefault()

            })
            $scope.$on('homeListModalHide', function(e) {
              console.log('modal hide')
              $scope.config.showModal = false;
              e.preventDefault()
            })
        }
    ]);
};
