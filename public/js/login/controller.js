'use strict';

angular.module('thesis.login', ['ngRoute'])

  .controller('LoginController', ['$scope', '$location', '$window', 'UserService', '$cookies', '$rootScope',
    function AdminUserCtrl($scope, $location, $window, UserService, $cookies, $rootScope ) {
      //Admin User Controller (login, logout)
      $scope.login = function login() {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email !== undefined && password !== undefined) {

          UserService.logIn(email, password).success(function(data) {
            $rootScope.$broadcast('userLoggedIn');
            $location.path("/profile");

          }).error(function(status, data) {

          });
        }

      };
      $scope.logout = function logout() {
        UserService.logOut().success(function(data) {
          $cookies.remove('name');
          $cookies.remove('id');
          $rootScope.$broadcast('userLoggedOut');
          $location.path("/login");
        });
      };

      $scope.profile = function() {
        if($cookies.get('id')) {
        $location.path("/profile");
      }
        $location.path("/login");
      };

      $scope.checkin = function() {
        if($cookies.get('id')) {
        $location.path("/foursquare");
      }
        $location.path("/login");
      };
    }
  ]);
