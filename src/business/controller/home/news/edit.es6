import 'angular'
import {editor} from 'lib/ueditor/ueditor.es6'

'use strict';

module.exports = function (app) {

    app.controller('newsEditCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 'dataProvider',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, dataProvider) {
            console.log('News Edit 控制器', mode);
            
            var modelNews = dataProvider({
              model: 'news',
              baseUrl: '/api/admin/'
            }),
            modelCategory = dataProvider({
              model: 'category',
              baseUrl: '/api/admin/'
            });

            
            var stateNames = $state.current.name.split('.');
            var mode = stateNames[ stateNames.length-1 ];
            $scope.config = {
              mode: mode,
              id: null,
              showModal: false,
              data: null,
              loaded: false,
              category: null,
              editor: editor.getEditor('editor')
            }
            

            $scope.func = {
              submitForm: function (e) {
                var cfg = $scope.config;
                cfg.data = cfg.data || {};
                cfg.data.content = cfg.editor.getContent()
              
                console.dir(cfg.data)
                modelNews.update(cfg.data)
                .then(function() {
                  alert('更新成功')
                }, function() {
                  alert('更新错误')
                })
                
              }
            }
            


            
            if (mode != 'create') {
              // edit mode
              var id = $scope.config.id = $state.params.id
              if ( !id ) {
                $state.go('home.news.list')
              }
              
              $q.all([
                modelNews.retrieve({id: $scope.config.id}),
                modelCategory.retrieve({})
                ])
              .then(function(data) {
                console.log(data)
                var dataNews = data[0].data
                var dataCategory = data[1].data

                $scope.config.loaded = true
                console.log(dataNews)
                $scope.config.data = dataNews

                $scope.config.category = dataCategory.data
                console.log(dataCategory)

                $scope.config.editor.ready(function(){
                  $scope.config.editor.setContent( $scope.config.data.content )
                })
              })
             
              $scope.$emit('homeListModalShow');
            }
            else {
              // create mode
              $scope.config.loaded = true
              $scope.$emit('homeListModalHide');
            }


            function autoWatchTextare() {

            }
        }
    ]);
};
