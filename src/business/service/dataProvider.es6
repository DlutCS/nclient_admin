import 'angular'


'use strict';

export default function(app) {
  //CRUD Provider
  app.factory('dataProvider', [ '$q', '$http',
    function($q, $http) {

      var cache = {

      }
      return function (_option) {
        var model = _option.model;
        var data = cache[model] || ( cache[model] = {} );
        var baseUrl = _option.baseUrl.replace(/\/$/,'')+'/' + model + '/';
        function createMethod(data) {
          return $http.post(
            baseUrl + 'create',
            data
            )
        }
        
        function retrieveMethod(data) {
          return $http({
            method: 'get',
            url:  baseUrl + 'retrieve/',
            params: data
          })
        }
      
        function updateMethod() {

        }

        function deleteMethod(data) {
          return $http({
            method: 'post',
            url:  baseUrl + 'delete/',
            data: 'id=1&id=2',
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
          })
        }

        return {
          'create': createMethod,
          'retrieve': retrieveMethod,
          'update': updateMethod,
          'delete': deleteMethod
        }
      }
    }
      
  ]);
};
