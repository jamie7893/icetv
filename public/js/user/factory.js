(function(angular) {
  angular.module('thesis')

  .factory('UserService', function($http, $cookies, $location) {
    var self = this;

    return {
      logIn: function(email, password) {
        return $http.post('/login', {
          email: email,
          password: password
        });

      },
      logOut: function() {
        return $http.get('/logout');
      },
      signUp: function(email, password, nameFirst, nameLast, username) {
        return $http.post('/signup', {
          email: email,
          password: password,
          nameFirst: nameFirst,
          nameLast: nameLast,
          username: username
        });
      },
      joinchat: function(id) {
        return $http.post('/joinchat', {
          id: id,
          idSender: $cookies.get('id')
        });
      },
      createMSG: function(msg, chatId, userId) {
        return $http.post('/createMSG', {
          message: msg,
          chatId: chatId,
          userId: userId
        });
      }
    };
  });
})(window.angular);
