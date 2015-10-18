import "angular"


"use strict";

module.exports = function(app) {
  //CRUD Provider
  app.directive("adminPagination", [ 
    function() {

      return {
        restrict: "E",
        scope: {
          loaded: "=loaded",
          pageCnt: "=pageCnt",
          retrieveFunc: "=retrieveFunc",
          pageTotal: "=pageTotal"
        },
        template: 

'  <ul class="pagination" ng-if="loaded"> '+
'    <li class="arrow " ng-class="{unavailable: pageCnt == 1}" ng-click="retrieveFunc(pageCnt-1)"><a href="">&laquo;</a></li>'+
'    <li class="" ng-if="pageCnt - 0 > 1"><a href="" ng-click="retrieveFunc(1)">1</a></li>'+
'    <li class="unavailable" ng-if="pageCnt >= 5" ><a href="">...</a></li>'+
'    <li class="" ng-if="pageCnt - 0 > 3"><a href="" ng-click="retrieveFunc(pageCnt-2)">{{pageCnt-2}}</a></li>'+
'    <li class="" ng-if="pageCnt - 0 > 2"><a href="" ng-click="retrieveFunc(pageCnt-1)">{{pageCnt-1}}</a></li>'+
'    <li class="current"><a href="">{{pageCnt}}</a></li>'+
'    <li class="" ng-if="pageCnt - pageTotal < -1"><a href="" ng-click="retrieveFunc(pageCnt+1)">{{pageCnt+1}}</a></li>'+
'    <li class="" ng-if="pageCnt - pageTotal < -2"><a href="" ng-click="retrieveFunc(pageCnt+2)">{{pageCnt+2}}</a></li>'+
'    <li class="unavailable"  ng-if="pageCnt - pageTotal <= -4"><a href="">...</a></li>'+
'    <li class="" ng-if="pageCnt - pageTotal < 0"><a href=""  ng-click="retrieveFunc(pageTotal)">{{pageTotal}}</a></li>'+
'    <li class="arrow" ng-class="{unavailable: pageCnt == pageTotal}" ng-click="retrieveFunc(pageCnt+1)"><a href="">&raquo;</a></li>'+
'  </ul>'

      }
    }
  ]);
};
