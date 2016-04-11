(function(angular) {
  angular.module('thesis')

  .factory('UserService', function($http, $cookieStore, $location) {
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
      edit: function(desc, nameFirst, nameLast, email) {
        return $http.put('/updateprofile', {
          desc: desc,
          nameFirst: nameFirst,
          nameLast: nameLast,
          email: email
        });
      },
      grav: function(email) {
        return $http.post('/gravatar', {
          email: email
        });
      },
      joinchat: function(id, name) {
        return $http.post('/joinchat', {
          id: id,
          idSender: $cookies.get('id'),
          name: name
        });
      }
    };
  });
})(window.angular);
