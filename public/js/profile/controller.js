(function(angular) {
  var myApp = angular.module('thesis');

  myApp.controller('EditProfileController', function($scope, $http, $cookies, UserService, $location) {

    $scope.titles = [];
    $scope.skills = [];
    $scope.count = [1];
    $scope.countCust = [0];
    $scope.number = 1;

    $scope.removeItem = function(array, index) {
      array.splice(index, 1);
    };

    $scope.increment = function(array) {
      $scope.number++;
      array.push($scope.number);
    };

    $http({
      method: 'GET',
      url: '/title'
    }).then(function successCallback(response) {
      $.map(response.data, function(title) {
        $scope.titles.push(title.name);
      });

    });
    $http({
      method: 'GET',
      url: '/skill'
    }).then(function successCallback(response) {
      $.map(response.data, function(skill) {
        $scope.skills.push(skill.name);
      });

    });

    $http({
      method: 'GET',
      url: '/user/' + $cookies.get('id')
    }).then(function successCallback(response) {
      $scope.user = response.data;
      $http({
        method: 'GET',
        url: '/user/' + $cookies.get('id') + '/profile'
      }).then(function successCallback(response2) {
        $scope.user.skills = [];
        $.map(response2.data, function(skill) {
          $.map(skill.skills, function(aSkill) {
            $scope.user.skills.push(aSkill.name);
          });
        });
      });
    });

    $scope.update = function() {
      UserService.grav($scope.user.gravEmail).success(function(data) {
        $scope.user.img = "https://s.gravatar.com/avatar/" + data + "?s=200";
      });

      $.map($scope.user.newskills, function(newskill) {
        $scope.user.skills.push(newskill);
      });
      $.map($scope.user.custSkill, function(aSkill) {
        $scope.user.skills.push(aSkill);
      });
      var nameFirst = $scope.user.nameFirst;
      var nameLast = $scope.user.nameLast;
      var skill = $scope.user.skills;
      var desc = $scope.user.desc;
      var title = $scope.user.title;
      var img = $scope.user.img;
      var twitter = $scope.user.twitter;
      var id = $cookies.get('id');
      if (nameLast !== undefined && nameFirst !== undefined) {
        UserService.edit(desc, title, nameFirst, nameLast, skill, img).success(function(data) {});
        UserService.twitter(twitter, id).success(function(data) {});
      }
      $location.path("/profile");
    };
  });

})(window.angular);
