'use strict';

var fs = angular.module('fs', ['fs-directives', 'fs-services']).
config(
		function($routeProvider) {
$routeProvider.
when('/login', {templateUrl: 'partials/login.html',controller: LoginCtrl}).
when('/preferences', {templateUrl: 'partials/preferences.html',controller: ProfileCtrl}).
when('/displayproducts', {templateUrl: 'partials/displayproducts.html',controller: DisplayBloggerCtrl}).
when('/displayproducts/:userId/:rank', {templateUrl: 'partials/bloggerDetail.html', controller: BloggerDetailCtrl}).
otherwise({redirectTo: '/'});

});