import 'angular'


'use strict';

export default function (app) {

    app.controller('homeCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q) {
            console.log('home controller');
            
           console.log('用一个service进行login校验，不行跳到 login')
            
            $scope.config = {
              showHeader: false
            }
        }
    ]);
};
