angular.module('thesis.chatroom', ['ngRoute'])

  .controller('ChatroomController', ['$scope', '$location', '$window', '$cookies', '$rootScope',
    function AdminUserCtrl($scope, $location, $window, $cookies, $rootScope) {
      $scope.users = ["Jamie", "Ben", "George"];
      $scope.messages = ["hey ben!", "Hey Jamie whats up?", "Nothing much just using some angular to do this!"];
      $scope.id = $rootScope.id;
        $scope.venue.name = $rootScope.venue;
          console.log($scope);
      }]);
