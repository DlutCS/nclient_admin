import 'angular'


'use strict';

module.exports = function(app) {
  //CRUD Provider
  app.factory('dataProvider', [ '$q', '$http', '$window',
    function($q, $http, $window) {

      var cache = {

      }
      return function (_option) {
        var model = _option.model;
        var data = cache[model] || ( cache[model] = {} );
        var baseUrl = _option.baseUrl.replace(/\/$/,'')+'/' + model + '/';

        function errorHandler(status) {
            $window.alert(status.msg)
            var code = parseInt(status.code)
            if ( code > 1000 )
              $window.location.href='/logout/'
        }

        function createMethod(data) {
          return $http({
            method: 'post',
            url:  baseUrl + 'create/',
            data: dataEncode(data),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
          })
          .error(errorHandler)
        }
        
        function retrieveMethod(data) {
          return $http({
            method: 'get',
            url:  baseUrl + 'retrieve/',
            params: data
          })
          .error(errorHandler)
        }
      
        function updateMethod(data) {
          //console.log( dataEncode(data) )
          return $http({
            method: 'post',
            url:  baseUrl + 'update/',
            data: dataEncode(data),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
          })
          .error(errorHandler)
        }

        function deleteMethod(data) {
          //console.log( dataEncode(data) )
          return $http({
            method: 'post',
            url:  baseUrl + 'delete/',
            data: dataEncode(data),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
           
          })
          .error(errorHandler)
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
