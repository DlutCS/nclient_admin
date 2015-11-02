import 'angular'
import {editor} from 'ueditor'

'use strict';

module.exports = function (app) {

    app.controller('newsEditCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 'dataProvider',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, dataProvider) {
            
            
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
            console.log('News Edit 控制器', mode);
            $scope.config = {
              mode: mode,
              id: null,
              showModal: false,
              data: null,
              dataDefault: {
                title: null,
                category_id: null,
                author: null,
                content: null
              },
              loaded: false,
              category: null,
              editor: editor.getEditor('editor')
            }
            console.log('editor', $scope.config.editor)

            $scope.func = {
              submitForm: function (e) {
                
                var cfg = $scope.config;
                cfg.data = cfg.data || cfg.dataDefault;
                cfg.data.content = cfg.editor.getContent()
                cfg.loaded = false;
                cfg.editor.setDisabled()
                

                if (mode !='create') {
                  modelNews.update(cfg.data)
                  .then(
                    afterAjax('更新成功')
                  , 
                    afterAjax('更新错误')
                  )
                }
                else {
                  // create
                  //check input
                  modelNews.create(cfg.data)
                  .then(
                    afterAjax('新建成功')
                  , 
                    afterAjax('新建错误')
                  )
                }

                function afterAjax(msg) {
                  return function(){
                    console.log(msg)
                    cfg.editor.setEnabled()
                    cfg.loaded = true;
                  }
                }
              }
            }
            


            
            if (mode != 'create') {
              // edit mode
              var cfg = $scope.config;
              cfg.editor.ready(function(){
                cfg.editor.setDisabled();
              });
              var id = cfg.id = $state.params.id
              if ( !id ) {
                $state.go('home.news.list')
              }
              
              $q.all([
                modelNews.retrieve({id: $scope.config.id}),
                modelCategory.retrieve({})
                ])
              .then(function(data) {

                var dataNews = data[0].data
                var dataCategory = data[1].data

                cfg.loaded = true
                console.log(dataNews)
                cfg.data = dataNews

                cfg.category = dataCategory.data
                console.log(dataCategory)

                cfg.editor.ready(function(){
                  cfg.editor.setEnabled();
                  cfg.editor.setContent( cfg.data.content )
                })
              })
             
              $scope.$emit('homeListModalShow');
            }
            else {
              // create mode
              var cfg = $scope.config;
              cfg.loaded = false
              cfg.editor.ready(function(){
                cfg.editor.setDisabled();
              });
              cfg.data = cfg.dataDefault;

              $q.all([
                modelCategory.retrieve({})
                ])
              .then(function(data) {
                
                var dataCategory = data[0].data

                cfg.loaded = true

                cfg.category = dataCategory.data


                cfg.editor.ready(function(){
                  cfg.editor.setEnabled();

                })
              })

              $scope.$emit('homeListModalHide');
            }

            $rootScope.$on('$stateChangeSuccess', function(e, fs,fp,ts,tp) {
              console.dir(e)
              if ( /edit|create/.test(fs.name) ) {
                $scope.config.editor && $scope.config.editor.destroy();

              }
            })
            
        }
    ]);
};
