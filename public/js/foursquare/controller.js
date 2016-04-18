angular.module('thesis.foursquare', ['ngRoute'])

.controller('CheckinController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService',
    function checkInCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService) {
        if (!$cookies.get('id')) {
            $location.path("/login");
        } else {
            // get users gps coords
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.lat = position.coords.latitude;
                $scope.long = position.coords.longitude;
                $http({
                    method: 'GET',
                    url: 'https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=' + $scope.lat + ',' + $scope.long + '&radius=800'
                }).then(function successCallback(response) {
                    $scope.venue = [];
                    $.map(response.data.response.groups[0].items, function(venues) {
                        $.map(venues, function(venue) {
                            if (venue.id) {
                                var aVenue = {};
                                aVenue.id = venue.id;
                                aVenue.name = venue.name;
                                aVenue.location = venue.location;
                                aVenue.contact = venue.contact;
                                $scope.venue.push(aVenue);
                            }
                        });
                    });
                });
            }, function error(msg) {
                alert('Please enable your GPS position future.');
            }, {
                maximumAge: 600000,
                timeout: 5000,
                enableHighAccuracy: true
            });

            $scope.venue = [];
            var checkin = function() {

            };

            // url: 'https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=40.7,-74&query=' + search + '&near=' + currentLocation

            // https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=29.9407336,-90.0820647&radius=200

            $scope.joinChat = function(id, name) {
                if ($cookies.get('id')) {
                    $rootScope.venue = name;
                    $rootScope.id = id;
                    $http({
                        method: 'GET',
                        url: 'https://api.foursquare.com/v2/venues/' + id + '/photos?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=40.7,-74&limit=5'
                    }).then(function successCallback(response) {
                        $rootScope.photos = response.data.response.photos.items;
                    });
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
