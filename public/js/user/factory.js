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
      signUp: function(email, password, nameFirst, nameLast) {
        return $http.post('/signup', {
          email: email,
          password: password,
          nameFirst: nameFirst,
          nameLast: nameLast
        });
      },
      edit: function(desc, title, nameFirst, nameLast, skill, img) {
        return $http.put('/updateprofile', {
          desc: desc,
          title: title,
          nameFirst: nameFirst,
          nameLast: nameLast,
          skill: skill,
          img: img
        });
      },
      twitter: function(twitter, id) {
          return $http.post('user/'+ id +'/twitter', {
          idUser: id,
          screenName: twitter
        });
      },
      grav: function(email) {
        return $http.post('/gravatar', {
          email: email
        });
      }

    };
  });
})(window.angular);
