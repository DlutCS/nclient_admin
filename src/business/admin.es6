import 'angular'
import adminApp from 'app/admin.es6'
import adminHomeState from 'state/home.es6'
import adminLoginState from 'state/login.es6'

import 'style/admin.scss'

adminHomeState( adminApp )
adminLoginState( adminApp )
angular.bootstrap(document, ['knewsAdmin']);