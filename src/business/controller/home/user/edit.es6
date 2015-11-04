import 'angular'
'use strict';

module.exports = function (app) {

    app.controller('userEditCtrl', ['$rootScope', '$scope', '$window', '$document', '$timeout', '$state', '$q', 'dataProvider',
        function ($rootScope, $scope, $window, $document, $timeout, $state, $q, dataProvider) {
            
            
            var modelUser = dataProvider({
              model: 'user',
              baseUrl: '/api/admin/'
            })

            
            var stateNames = $state.current.name.split('.');
            var mode = stateNames[ stateNames.length-1 ];
            console.log('User Edit 控制器', mode);
            $scope.config = {
              mode: mode,
              id: null,
              showModal: false,
              data: null,
              dataDefault: {
                username: null,
                nickname: null,
                password: null
              },
              loaded: false,

            }

            $scope.func = {
              submitForm: function (e) {
                
                var cfg = $scope.config;
                cfg.data = cfg.data || cfg.dataDefault;
              
                cfg.loaded = false;

                

                if (mode !='create') {
                  modelUser.update(cfg.data)
                  .then(
                    afterAjax('更新', true)
                  , 
                    afterAjax('更新', false)
                  )
                }
                else {
                  // create
                  //check input
                  modelUser.create(cfg.data)
                  .then(
                    afterAjax('新建', true)
                  , 
                    afterAjax('新建', false)
                  )
                }

                function afterAjax(msg, reslut) {
                  return function(status){
                    console.log(status)
  
                    cfg.loaded = true;
                    $window.alert(msg+(reslut?'成功':'失败'))
                    reslut && $state.go('home.user.list')
                  }
                }
              }
            }
            


            
            if (mode != 'create') {
              // edit mode
              var cfg = $scope.config;

              var id = cfg.id = $state.params.id
              if ( !id ) {
                $state.go('home.user.list')
              }
              
              $q.all([
                modelUser.retrieve({id: $scope.config.id}),
                ])
              .then(function(data) {

                var dataNews = data[0].data


                cfg.loaded = true
                console.log(dataNews)
                cfg.data = dataNews


              })
             
              $scope.$emit('homeListModalShow');
            }
            else {
              // create mode
              var cfg = $scope.config;
              cfg.loaded = true
             
              cfg.data = cfg.dataDefault;

        

              $scope.$emit('homeListModalHide');
            }

            
        }
    ]);
};
