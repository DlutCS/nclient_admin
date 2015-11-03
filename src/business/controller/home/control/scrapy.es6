import 'angular'


'use strict';

module.exports = function (app) {

    app.controller('controlScrapyCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q','$http',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, $http) {
            console.log('Control Scarpy 控制器');
            $scope.config = {
              spiders: []
            }
           
            $http({
              method:'get',
              url:'http://senyu.me:6800/listspiders.json?project=netease'
            })
            .then(function(status) {
              var data = status.data
              console.log(data)
              $scope.config.spiders = data.spiders
            })
        }
    ]);
};
