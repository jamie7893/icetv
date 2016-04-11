angular.module('thesis.foursqure', ['ngRoute'])

.controller('CheckinController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService',
  function checkInCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService) {

    $scope.checkin = function() {
      if ($scope.search === undefined) {
        $scope.search = "";
      }
      if ($scope.currentLocation === undefined) {
        $scope.currentLocation = "";
      }
      search = $scope.search.replace(" ", "_").toLowerCase();
      currentLocation = $scope.currentLocation.replace(" ", "_").toLowerCase();
      $http({
        method: 'GET',
        url: 'https://api.foursquare.com/v2/venues/search?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=40.7,-74&query=' + search + '&near=' + currentLocation
      }).then(function successCallback(response) {

        $.map(response.data, function(venues) {
          $scope.venue = [];
          $.map(venues.venues, function(venue) {
            $scope.venue.push(venue);
          });
        });
      });
    };

    $scope.joinChat = function(id, name) {
      $rootScope.venue = name;
      $rootScope.id = id;
      // UserService.joinchat(id, name).success(function(data) {
        $location.path("/chatroom");
      // });
    };


  }
]);
