angular.module('thesis.chatroom', ['luegg.directives', 'emoji', 'vkEmojiPicker', 'mgcrea.ngStrap'])

.controller('ChatroomController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService',
    function AdminUserCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService) {
        if (!$cookies.get('id')) {
            $location.path("/login");
        } else {
            $scope.users = [];
            $scope.messages = [];
            $scope.id = $rootScope.id;
            var chatId = $scope.id;

            var refreshUsers = function() {
                $http({
                    method: 'GET',
                    url: '/joinchat'
                }).then(function successCallback(response) {
                    $scope.users = $.map(response.data, function(chat) {
                        if (chat.idChatroom === chatId) {
                            return chat;
                        }
                    });
                    setTimeout(refreshUsers, 1000);
                });
            };
            var refreshMsgs = function() {
                $http({
                    method: 'GET',
                    url: '/createMSG'
                }).then(function successCallback(response) {
                    $scope.messages = $.map(response.data, function(data) {
                        if (data.idChatroom === chatId) {
                            return data;
                        }
                    });
                    setTimeout(refreshMsgs, 1000);
                });
            };
            refreshUsers();
            refreshMsgs();
            $scope.createMSG = function(msg) {
                if ($cookies.get('id')) {
                    UserService.createMSG(msg, chatId, $cookies.get('id')).then(function(data) {});
                    $scope.message = "";
                } else {
                    $location.path("/login");
                }
            };
        }
    }
]);
