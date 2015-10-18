import 'angular'


'use strict';

module.exports = function (app) {

    app.controller('newsEditCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q) {
            
            var stateNames = $state.current.name.split('.');
            var mode = stateNames[ stateNames.length-1 ];
            $scope.config = {
              mode: mode,
              id: null,
              showModal: false
            }
            
            console.log('News Edit 控制器', mode);

            if (mode != 'create') {
              // edit mode
              var id = $scope.config.id = $state.params.id
              if ( !id ) {
                $state.go('home.news.list')
              }
              

            }
            else {

            }

        }
    ]);
};
