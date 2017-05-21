'use strict';
let botConfig = require('../config/config.js'),
  bcrypt = require('bcrypt-nodejs'),
  _ = require('lodash'),
  request = require('request'),
  crypto = require('crypto');

module.exports = function(sequelize) {
  var User = sequelize.import ("../model/user");
  var Chat = sequelize.import ("../model/chatroom");
  var userChatJct = sequelize.import ("../model/userchatroomjct");
  var Creds = sequelize.import ("../model/credentials");

  Creds.hasOne(User, {"foreignKey": "id"});
  User.hasOne(Creds, {"foreignKey": "idUser"});
  User.belongsToMany(Chat, {
    "foreignKey": "idUser",
    "through": {
      model: userChatJct
    }
  });
  Chat.belongsToMany(User, {
    "foreignKey": "idChatroom",
    "through": {
      model: userChatJct
    }
  });
  return {
    create: function(req, res, callback) {
      var sess = req.session;
      console.log(req)
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if (user) {
          var err = 'The Email you entered already exists';
          callback(err);
        } else {
          var newUser = {
            email: req.body.email,
            nameLast: req.body.nameLast,
            nameFirst: req.body.nameFirst,
            username: req.body.username

          };
          var aSalt = bcrypt.genSaltSync(10);

          var aHash = bcrypt.hashSync(req.body.password, aSalt);

          User.create(newUser).then(function(aNewUser) {
            var newPass = {
              idUser: aNewUser.id,
              hash: aHash
            };
            Creds.create(newPass).then(function() {

              var date = new Date();
              var minutes = 60 * 24;
              date.setTime(date.getTime() + (minutes * 60 * 1000));
              res.cookie("username", aNewUser.username, {expires: date});
              res.cookie("id", aNewUser.id, {expires: date});
              res.send(aNewUser);
            });
          });
        }
      });
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

      var sess = req.session;
      User.findOne({
        where: {
          id: req.cookies.id
        }
      }).then(function(user) {
        if (!user) {
          var err = 'Your not logged in!';
          callback(err);
        }
        if (req.body.gravEmail) {
          var email = req.body.gravEmail;
          var hash = crypto.createHash('md5').update(email).digest('hex');
          var userProfile = {
            nameLast: req.body.nameLast,
            nameFirst: req.body.nameFirst,
            desc: req.body.desc,
            img: "https://s.gravatar.com/avatar/" + hash + "?s=200"

          };
        } else if (req.file) {
          var userProfile = {
            nameLast: req.body.nameLast,
            nameFirst: req.body.nameFirst,
            desc: req.body.desc,
            img: "/images/profile/" + req.file.filename
          };
        } else {
          var userProfile = {
            nameLast: req.body.nameLast,
            nameFirst: req.body.nameFirst,
            desc: req.body.desc
          };
        }
        User.update(userProfile, {
          where: {
            id: user.id
          }
        });
        res.send(200);
      });

    },
    login: function(req, res, callback) {
      console.log(req.body);
      var sess = req.session;
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if (user) {
          User.findAll({
            where: {
              id: user.id
            },
            include: [
              {
                model: Creds,
                attributes: ['hash']
              }
            ],
            attributes: []

          }).then(function(password) {
            if (bcrypt.compareSync(req.body.password, password[0].credential.dataValues.hash)) {
              sess.email = req.body.email;
              User.findOne({
                where: {
                  email: req.body.email
                }
              }).then(function(user) {
                var date = new Date();
                var minutes = 60 * 24;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                res.cookie("username", user.dataValues.username, {expires: date});
                res.cookie("id", user.dataValues.id, {expires: date});
                res.send(user);
              });
            }
          });
        }
      });
    },
    isLoggedIn: function(req, res) {
      console.log(req.user)
      if (req.user) {
        res.json({
          showLogin: false,
          showLogout: true
        })
      } else {
        res.json({
          showLogin: true,
          showLogout: false
        })
      }
    },
    logout: function(req, res) {
      req.session.destroy();
      res.clearCookie();
      res.redirect("/")
    }
  };
};
