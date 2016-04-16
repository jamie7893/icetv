angular.module('thesis.chatroom', ['luegg.directives', 'emoji', 'vkEmojiPicker', 'mgcrea.ngStrap'])

.controller('ChatroomController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService', 'chatSocket',
    function AdminUserCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService, chatSocket) {
        if (!$cookies.get('id')) {
            $location.path("/login");
        } else {
            $scope.users = [];
            $scope.messages = [];
            $scope.id = $rootScope.id;
            var chatId = $scope.id;
            $rootScope.id = null;
            chatSocket.emit('joinedChat', {
                chatId: $scope.id
            });

            chatSocket.on('message', function(data) {
                console.log(data);
                $scope.messages = data.messages;
                $scope.users = data.users;
            });

            $scope.$on('$destroy', function() {
                if ($scope.users.length === 1) {
                    chatSocket.emit('DestroyChat', {
                        idChatroom: chatId,
                        idUser: $cookies.get('id')
                    });
                    chatSocket.removeListener();
                } else {
                    chatSocket.emit('leaveChat', {
                        idUser: $cookies.get('id')
                    });
                    chatSocket.removeListener();
                }
            });

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
