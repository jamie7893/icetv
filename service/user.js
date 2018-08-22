'use strict';
let botConfig = require('../config/config.js'),
  request = require('request');

module.exports = function(sequelize) {
  var User = sequelize.import ("../model/user");

  return {
    create: function(req, res, callback) {

    },
    refresh: function(req, res, callback) {
      console.log(req.user)
      if (!req.user) {
        res.redirect("/auth/youtube")
      }
      let sess = req.user;
      var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      // Configure the request
      var options = {
        url: `https://www.googleapis.com/oauth2/v4/token?client_secret=IKg5ioVbNBUjV8KXpTYBcXyQ&grant_type=refresh_token&refresh_token=${sess.refreshToken}&client_id=228570957092-s2q13ded976iftolmqbvvmpeafnltt61.apps.googleusercontent.com`,
        method: 'POST',
        headers: headers
      }
      // Start the request
      request(options, function(error, response, body) {
        body = JSON.parse(body);
        if (!error && response.statusCode == 200) {
          User.update({
            "accessToken": body.access_token
          }, {
            where: {
              userId: sess.userId
            }
          }).then(function(data) {
            res.send(200)
          }).catch(function(err) {
            console.log("error", err)
            res.send(500);
          })
        } else {
          console.log(error, response, body)
        }
      });
    },
    updateprofile: function(req, res, callback) {
      console.log("updateprofile")
    },
    login: function(req, res, callback) {
      console.log("login")

    },
    isLoggedIn: function(req, res) {
      console.log(req.user)
      if (req.user) {
        res.json({showLogin: false, showLogout: true})
      } else {
        res.json({showLogin: true, showLogout: false})
      }
    },
    logout: function(req, res) {
      req.session.destroy();
      res.clearCookie();
      res.redirect("/")
    }
  };
};
