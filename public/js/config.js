/* global FastClick, smoothScroll */
(function(angular) {
  angular.module('thesis', ['ngAnimate', 'ngSanitize', 'btford.socket-io', 'ngRoute', 'ngFileUpload', 'ngCookies', 'thesis.login', 'thesis.register', 'thesis.foursquare', 'thesis.chatroom', 'satellizer', 'toastr',]);

  var myApp = angular.module('thesis');



var config = ['$routeProvider', '$locationProvider', '$authProvider',
  function config($routeProvider, $locationProvider, $authProvider) {
    $routeProvider
      .when('/', {
        controller: 'RegisterController',
        templateUrl: 'templates/home.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'templates/login.html',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .when('/profile', {
        controller: 'EditProfileController',
        templateUrl: 'templates/editprofile.html',
        // resolve: {
        //   loginRequired: loginRequired
        // }
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

      $authProvider.google({
     clientId: "583757200523-dkje7m5ih74iertghm19nl9ghp3b1irr.apps.googleusercontent.com"
    });
        $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: "ZHDXLETOK5N2YPUMFQW2DNKRHPZ2AY33ACJCDMUCYJ1LC5LM",
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });

        $authProvider.github({
      clientId: 'GitHub Client ID'
    });

       $authProvider.twitter({
      url: '/auth/twitter'
    });

       function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

  }]
  myApp
    .config(config);
})(window.angular);
