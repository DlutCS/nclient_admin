/**
 * @Descript: 登录相关组件
 * @params {json} options 
 *  参数格式：{hideType:'close/reload/changeHash/redirect',targetUrl:'hash/url'}
 *  close - 不做任何操作
 *  reload - 执行window.location.reload()
 *  changeHash - 执行window.location.hash=targetUrl
 *  redirect - 执行window.location.href=url
 * @method 
 *  login.goLogin(options)
 *  login.goLogout(options)
 *  login.isLogin() return boolen, 是否登录、判断cookie
 *  login.getUserNick() return string, 返回用户昵称
 */
import 'angular'


'use strict';

module.exports = function(app) {
  app.factory('login', ['$window', '$q', '$state','$location',
    function($window, $q, $state, $location) {

      var loginData = {
        logined: true
      };

      function goLogin() {
        console.log($window)
        console.log($location)
        var loginUrl = $window.location.origin + '/login?callback=/admin/%23' + $location.url();
        
        $window.location.href = loginUrl
      }

      function isLogin() {
        return loginData.logined
      }

      function needLogin() {
        if ( !loginData.logined )
          goLogin()
      }

      return {
        isLogin: isLogin,
        needLogin: needLogin
      }
      var win = $window;
      var doc = win.document;
      var ua = win.navigator.userAgent;
      var hostname = location.hostname;
      var search = win.location.search;

      var HOST_REGEXP = /.*?([^.]+)(?:\.x|\.demo)?\.(taobao|tmall|etao|alibaba|alipay|aliyun|tdd)\.(com|net|la).*/i;
      var MAIN_DOMAIN = (function() {
        if (hostname.match(/taobao\.com$/)) {
          return 'taobao.com';
        } else if (hostname.match(/taobao\.net$/)) {
          return 'taobao.net';
        } else if (hostname.match(/tdd\.la$/)) {
          return 'tdd.la';
        } else {
          return 'taobao.com';
        }
      })();

      var SUB_DOMAIN = (function() {
        var type, host;
        if (hostname.indexOf('x.taobao.net') > -1 || hostname.indexOf('demo.taobao.net') > -1) {
          type = 'waptest';
        } else if (hostname.indexOf('tdd.la') > -1) {
          host = hostname.match(HOST_REGEXP);
          type = '';
          if (host && (host[1] === 'waptest' || host[1] === 'wapa')) {
            type = host[1];
          }
        } else {
          host = hostname.match(HOST_REGEXP);
          type = 'm';
          if (host && (host[1] === 'waptest' || host[1] === 'wapa' || host[1] === 'm')) {
            type = host[1];
          }
        }
        return type;
      })();

      function readCookie(name) {
        var matched = new RegExp('(?:^|;\\s*)' + name + '\\=([^;]+)(?:;\\s*|$)').exec(doc.cookie);
        if (matched) {
          return matched[1];
        } else {
          return undefined; 
        }
      }

      function inApp() {
        return ua.indexOf('AliApp') > 0 ||
          ua.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/) ||
          search.match(/ttid\=[^@]+@[^_]+_[^_]+_[\d\.]+/) ||
          ua.indexOf('WindVane') > 0;
      }

      function redirect(url, isReplace) {
        if (inApp()) {
          var elA = doc.createElement('a');
          var evClick = doc.createEvent('HTMLEvents');

          elA.style.display = 'none';
          elA.href = url;
          doc.body.appendChild(elA);

          evClick.initEvent('click', false, true);
          elA.dispatchEvent(evClick);
        } else {
          if (isReplace) {
            location.replace(url);
          } else {
            location.href = url;
          }
        }
      }

      var PREFIX = 'login';

      var libLogin = {
        config: {
          loginName: 'login.htm',
          logoutName: 'logout.htm',
          prefix: PREFIX,
          mainDomain: MAIN_DOMAIN,
          subDomain: SUB_DOMAIN,
          protocol: location.protocol
        },
        genUrl: function(type, target) {
          var url = this.config.protocol + '//' +
            (this.config.prefix ? this.config.prefix + '.' : '') +
            (this.config.subDomain ? this.config.subDomain + '.' : '') +
            this.config.mainDomain +
            '/' + this.config[(type || 'login') + 'Name'];

          if (target !== false) {
            url += '?tpl_redirect_url=' + encodeURIComponent(target || location.href);
          }

          return url;
        },
        goLogin: function(options) {
          options = options || {};
          options.targetUrl = options.targetUrl || options.redirectUrl || options.rediUrl;

          var url = this.genUrl('login', options.targetUrl);
          redirect(url, options.replace);
        },
        goLogout: function(options) {
          options = options || {};
          options.targetUrl = options.targetUrl || options.redirectUrl || options.rediUrl;

          var url = this.genUrl('logout', options.targetUrl);
          redirect(url, options.replace);
        },
        isLogin: function() {
          //var imeval = readCookie('imewweoriw') || '';
          var nick = this.getUserNick();
          // 新的逻辑，就针对昵称的cookie字典来判断
          return !!nick;
        },
        getUserNick : function() {
          var nick = '';
          var tbnick = readCookie('_nk_') || readCookie('snk');
          if (tbnick && tbnick.length > 0 && tbnick != 'null') {
            nick = unescape(unescape(tbnick).replace(/\\u/g, '%u'));
          }
          return nick;
        }

      };

      return libLogin;
    }
  ]);
};
