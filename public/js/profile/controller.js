(function(angular) {
  var myApp = angular.module('thesis');

  myApp.controller('EditProfileController', function($scope, $http, $cookies, UserService, $location) {

    $scope.update = function() {
      UserService.grav($scope.user.gravEmail).success(function(data) {
        $scope.user.img = "https://s.gravatar.com/avatar/" + data + "?s=200";
      });
      var nameFirst = $scope.user.nameFirst;
      var nameLast = $scope.user.nameLast;
      var desc = $scope.user.desc;
      var img = $scope.user.img;
      var email = $scope.user.gravEmail;
      if (nameLast !== undefined && nameFirst !== undefined) {
        UserService.edit(desc, nameFirst, nameLast, email).success(function(data) {});
      }
      $location.path("/foursqure");
    };
  });

})(window.angular);
