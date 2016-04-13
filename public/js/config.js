/* global FastClick, smoothScroll */
(function(angular) {
  angular.module('thesis', ['ngAnimate', 'ngSanitize', 'ngRoute', 'ngCookies', 'thesis.login', 'thesis.register', 'thesis.foursquare', 'thesis.chatroom']);

  var myApp = angular.module('thesis');

  myApp
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'RegisterController',
        templateUrl: 'templates/home.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'templates/login.html'
      })
      .when('/profile', {
        controller: 'EditProfileController',
        templateUrl: 'templates/editprofile.html'
      })
      .when('/chatroom', {
        controller: 'ChatroomController',
        templateUrl: 'templates/chatroom.html'
      })
      .when('/foursquare', {
        controller: 'CheckinController',
        templateUrl: 'templates/checkin.html'
      })
      .when('/logout', {
        controller: 'CheckinController',
        templateUrl: 'templates/checkin.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})(window.angular);
