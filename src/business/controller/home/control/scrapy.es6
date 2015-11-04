import 'angular'


'use strict';

module.exports = function (app) {

    app.controller('controlScrapyCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q','$http',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, $http) {
            console.log('Control Scarpy 控制器');
            $scope.config = {
              projects: [],
              status: [],
              actions: [{name:'pending',text:'等待中'},{name:'running',text:'运行中'}, {name:'finished',text:'已完成'}]
            }
           
            $scope.func = {
              random: function(cnt) {
                cnt = cnt || 100;
                $http({
                  method:'get',
                  url:'/api/admin/control/random/'+cnt,
                })
                .then(function() {
                  $window.alert('random')
                })
              },
              schedule: function(project, spider) {
                $http({
                  method:'post',
                  url:'http://senyu.me:6800/schedule.json', 
                  data: 'project='+project+'&spider='+spider,
                  headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function () {
                  $timeout(loadStatus)
                })
              },
              updateConfig: function () {
                return Model('config')
                .then(function(status) {
                  var data = status.data
                  console.log(data)
                  $scope.config.projects = data.projects
                })
              },
              updateStatus: function () { 
                return Model('status')
                .then(function(status) {
                  var data = status.data
                  console.log(data)
                  $scope.config.status = data.projects
                }) 
              }
            }
            function Model(action) {
              return $http({
                  method:'get',
                  url:'/api/admin/scrapy/'+action
                })
            }
            
            $scope.func.updateConfig()
            $scope.func.updateStatus()
            
            function loadStatus(){
              $scope.func.updateStatus()
              .then(function(status) {
                var result = travel()
                if ( result.pending + result.running > 0 )
                  $timeout(loadStatus, 500)
              })
              
              function travel() {
                var cfg = $scope.config
                var status = {
                  'pending': 0,
                  'running': 0,
                  'finished': 0
                }
                angular.forEach(cfg.projects, function (project) {
                  angular.forEach(status, function (v, key) {
                    status[key] += cfg['status'][project.name][key].length
                  })
                })
                console.log(status)
                return status
              }
            }
            

        }
    ]);
};
