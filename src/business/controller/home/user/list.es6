import 'angular'
import 'style/home/list.scss'

'use strict';

module.exports = function (app) {

 
    app.controller('userListCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 'dataProvider',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, dataProvider) {
            console.log('user List 控制器', $state.params);
            $scope.config = {
              records: [],
              total: null,
              loaded: false,
              pageCnt: $state.params.pageCnt || 1,
              pageLimit: 20,
              pageTotal: 1,
            }
            var modelUserlist = dataProvider({
              model: 'user',
              baseUrl: '/api/admin/'
            });

            //model.retrieve({id: 1})
            $scope.$emit('homeListModalHide');
            

            // model['delete']({
            //   id: [1,2,3]
            // })
            
            $scope.func = {
              deleteAll: function (event) {
                var idset = $scope.config.records
                  .filter(function(r){
                    if (r.select) return true
                  })
                  .map(function(r) {
                    return r.id
                  })
                console.log(idset)
              },
              deleteOne: function($event) {
                console.log($event)
              },
              retrievePage: function(pageCnt) {
                pageCnt = pageCnt || $scope.config.pageCnt
                console.log('retrieve')
                if (pageCnt < 1 || pageCnt > $scope.config.pageTotal ) return;
                $scope.config.loaded = false;
                modelUserlist.retrieve({
                  start: (pageCnt - 1)* $scope.config.pageLimit, 
                  limit: $scope.config.pageLimit
                })
                .success(function(data) {
                  $scope.config.pageCnt = pageCnt;
                  $scope.config.records = data.data;
                  $scope.config.total = data.total;
                  $scope.config.loaded = true;
                  $scope.config.pageTotal = Math.ceil($scope.config.total / $scope.config.pageLimit)
                })
                .error(function() {

                })
              }
            }

            $scope.func.retrievePage(1)
        }
    ]);
};
