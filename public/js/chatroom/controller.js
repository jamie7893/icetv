angular.module('thesis.chatroom', ['luegg.directives'])

.controller('ChatroomController', ['$scope', '$location', '$window', '$cookies', '$rootScope', '$http', 'UserService',
  function AdminUserCtrl($scope, $location, $window, $cookies, $rootScope, $http, UserService) {
    $scope.users = [];
    $scope.messages = [];
    $scope.id = $rootScope.id;
    var chatId = $scope.id;
    $http({
      method: 'GET',
      url: '/joinchat'
    }).then(function successCallback(response) {
      $.map(response.data, function(chat) {
        if (chat.idChatroom === chatId) {
          $scope.users.push(chat);
        }
      });
    });
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
        refreshMsgs();
      });
    };
    refreshMsgs();
    $scope.createMSG = function(msg) {
      UserService.createMSG(msg, chatId, $cookies.get('id')).then(function(data) {
        refreshMsgs();
      });
    };




  }
]);
