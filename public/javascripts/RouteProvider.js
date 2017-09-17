'use strict';
angular.module('nodeTodo', ['ngRoute', 'ngResource'])
/* Config */
.config( ['$routeProvider', function($routeProvider,$locationProvider)  {
  $routeProvider
  .when('/', {
    templateUrl: 'tmp/index.html',
    controller: 'mainController'
  })
  .when('/users', {
    templateUrl: 'tmp/users.html',
    controller: 'UserController'
  })
  .when('/registration', {
    templateUrl: 'tmp/registration.html',
    controller: 'RegistController'
  })
  .when('/update', {
    templateUrl: 'tmp/update.html',
    controller: 'UpdateController'
  })
}]);
