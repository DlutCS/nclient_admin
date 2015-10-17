import 'angular'


'use strict';

module.exports = function (app) {

    app.controller('categoryEditCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q) {
            console.log('Category Edit 控制器');
            
            var stateNames = $state.current.name.split('.');
            $scope.workMode = stateNames[ stateNames.length-1 ];
            
        }
    ]);
};
