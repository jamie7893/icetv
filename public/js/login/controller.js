'use strict';

angular.module('thesis.login', ['ngRoute'])

  .controller('LoginController', ['$scope', '$location', '$window', 'UserService', '$cookies', '$rootScope', '$auth', 'toastr',
    function AdminUserCtrl($scope, $location, $window, UserService, $cookies, $rootScope, $auth, toastr) {
      //Admin User Controller (login, logout)
      $scope.login = function login() {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email !== undefined && password !== undefined) {
          UserService.logIn(email, password).success(function(data) {
            // $rootScope.$broadcast('userLoggedIn');
            toastr.info('You have successfully created a new account and have been signed-in');
            $location.path("/profile");

          }).error(function(status, data) {
             
          });
        }

      };
      $scope.logout = function logout() {
        UserService.logOut().success(function(data) {
          $cookies.remove('name');
          $cookies.remove('id');
          // $rootScope.$broadcast('userLoggedOut');
          toastr.info('You have been logged out');
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
       $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/profile');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            toastr.error(error.error);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
    }
  ]);
