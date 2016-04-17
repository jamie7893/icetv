(function(angular) {
    var myApp = angular.module('thesis');

    myApp.controller('EditProfileController', function($scope, $http, $cookies, UserService, $location, Upload) {
        if (!$cookies.get('id')) {
            $location.path("/login");
        } else {
            // upload later on form submit or something similar
            $scope.submit = function() {
                if ($scope.regForm.file.$valid && $scope.file) {
                    $scope.upload($scope.file);
                }
            };

            // upload on file select or drop
            $scope.upload = function(file) {
              if($cookies.get('id')) {
                Upload.upload({
                    url: '/updateprofile',
                    data: {
                        file: file,
                        id: parseInt($cookies.get('id')),
                        desc: $scope.user.desc,
                        nameFirst: $scope.user.nameFirst,
                        nameLast: $scope.user.nameLast,
                        email: $scope.user.gravEmail
                    }
                }).then(function(resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                        $location.path("/foursquare");
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
              } else {
                $location.path('/login');
              }
            };
        }
    });

})(window.angular);
