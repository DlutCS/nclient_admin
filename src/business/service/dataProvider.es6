import 'angular'


'use strict';

module.exports = function(app) {
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
          console.log( dataEncode(data) )
          return $http({
            method: 'post',
            url:  baseUrl + 'delete/',
            data: dataEncode(data),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
          })
        }

        function dataEncode(data) {
          var ret = [];
          var value;

          var keyEncoded;
          for(var key in data) {
            value = data[key];
            keyEncoded = encodeURIComponent( key );
            if ( data.hasOwnProperty(key) ) {
              if ( angular.isArray( value ) ) {
                value.forEach(function(v) {
                  ret.push( keyEncoded + '=' + encodeURIComponent( v ) );
                })
              }
              else if ( angular.isObject( value ) ) {
                ret.push( keyEncoded + '=' + JSON && JSON.stringify( value ) );
              }
              else
                ret.push( keyEncoded + '=' + encodeURIComponent( value ) )
              
            }

          }

          return ret.join('&')
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
