import 'angular'
import 'style/home/list.scss'

'use strict';

export default function (app) {

    app.controller('newsListCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 'dataProvider',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, dataProvider) {
            console.log('news List 控制器');
            $scope.config = {
              records: []
            }
            var model = dataProvider({
              model: 'news',
              baseUrl: '/api/admin/'
            });

            //model.retrieve({id: 1})
            model.retrieve({start: 0, limit: 10})
            .success(function(data) {
              $scope.config.records = data
            })
            .error(function() {

            })
            

            model['delete']({
              id: [1,2,3]
            })
            
        }
    ]);
};
