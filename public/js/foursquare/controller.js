angular.module('thesis.foursquare', ['ngRoute'])

.controller('CheckinController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService',
    function checkInCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService) {
        if (!$cookies.get('id')) {
            $location.path("/login");
        } else {
          $scope.venue = [];
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
                    url: 'https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=40.7,-74&query=' + search + '&near=' + currentLocation + '&venuePhotos=1'
                }).then(function successCallback(response) {
                    $scope.venue = [];
                    $.map(response.data.response.groups[0].items, function(venues) {
                        $.map(venues, function(venue) {
                            if (venue.id) {
                                var aVenue = {};
                                aVenue.id = venue.id;
                                aVenue.name = venue.name;
                                aVenue.photos = venue.photos;
                                aVenue.location = venue.location;
                                aVenue.contact = venue.contact;
                                $scope.venue.push(aVenue);
                            }
                        });
                    });
                    // https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=40.7,-74&query=canes&near=kenner&venuePhotos=5
                });
            };

            $scope.joinChat = function(id, name, photos) {
                if ($cookies.get('id')) {
                    $rootScope.venue = name;
                    $rootScope.photos = photos;
                    $rootScope.id = id;
                    UserService.joinchat(id).success(function(data) {
                        $location.path("/chatroom");
                    });
                } else {
                    $location.path("/login");
                }
            };

        }
    }
]);
