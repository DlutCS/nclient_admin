/**
 * @description
 * web components - ddNavBar
 * Nav Bar 负责更新 controller 状态改变
 * @import components/nav-var.js
 * @importCSS components/nav-bar.css
 * 顶部导航组件
 */
define(function (require, exports, module) {
    'use strict';

    //require('./server/nav-bar.css');

    module.exports = function(app){
      app.directive('ddNavBar', ['$rootScope', '$compile',
        function($rootScope, $compile) {

            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    type: '@',
                    backButtonType: '@',
                    backButtonLabel: '@',
                    backButtonIcon: '@',
                    navBarTitle: '@navTitle',
                    enableBackButton: '@navBack',
                },
                template: '<header id="dd-bar" class="comm_header retina_line_gray">' +
                    '<span ng-click="goBack()" class="hd_back" ng-class="backButtonClass" ng-if="enableBackButton" id="J_close_webview">返回</span>' +
                    '<span ng-click="goRight()" class="hd_icon" ng-transclude ></span>' + 
                    '<div class="hd_title">' +
                    '<h2>{{navBarTitle}}</h2>' +
                    '</div></header>',
                link: function($scope,$element, $attr) {

                    $scope.goBack = function () {
                        window.history.go(-1);
                    }

                    $scope.goRight = function () {
                        console.log('trigger goRight');
                    }

                    //$scope.enableBackButton = true;
                    //$rootScope

                    $scope.$on('ddBarRightClick', function(e, data) {
                        $scope.goRight = data.rightClick;
                    });
                   
                    /*$rootScope.$on('viewEnter', function(e, data) {
                        $scope.navBarTitle = data.title;
                    });*/
                }
            };
        }])
    }
});

