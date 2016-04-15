'use strict';
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
var crypto = require('crypto');
module.exports = function(sequelize) {
  var User = sequelize.import("../model/user");
  var Chat = sequelize.import("../model/chatroom");
  var userChatJct = sequelize.import("../model/userchatroomjct");
  var Creds = sequelize.import("../model/credentials");

  Creds.hasOne(User, {
    "foreignKey": "id"
  });
  User.hasOne(Creds, {
    "foreignKey": "idUser"
  });
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
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if (user) {
          var err = 'The Email you entered already exists';
          callback(err);
        }
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
            var minutes = 30;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            res.cookie("name", aNewUser.nameFirst, {
              expires: date
            });
            res.cookie("id", aNewUser.id, {
              expires: date
            });
            res.redirect('/#/profile');
          });
        });
      });
    },
    updateprofile: function(req, res, callback) {
      console.log(req.body);
      console.log(req.file);
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
        if(req.body.email) {
        var email = req.body.email;
        var hash = crypto.createHash('md5').update(email).digest('hex');
        var userProfile = {
          nameLast: req.body.nameLast,
          nameFirst: req.body.nameFirst,
          desc: req.body.desc,
          img: "https://s.gravatar.com/avatar/" + hash + "?s=200"

        };
      } else {
        var userProfile = {
          nameLast: req.body.nameLast,
          nameFirst: req.body.nameFirst,
          desc: req.body.desc,
          img: "/images/profile/" + req.file.filename
        };
      }
        User.update(userProfile, {
          where: {
            id: user.id
          }
        });
        res.redirect('/#/foursquare');
      });

    },
    login: function(req, res, callback) {
      var sess = req.session;
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        User.findAll({
          where: {
            id: user.id
          },
          include: [{
            model: Creds,
            attributes: ['hash']
          }],
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
              var minutes = 30;
              date.setTime(date.getTime() + (minutes * 60 * 1000));
              res.cookie("name", user.dataValues.nameFirst, {
                expires: date
              });
              res.cookie("id", user.dataValues.id, {
                expires: date
              });
              res.redirect('/#/profile');
            });
          }
        });
      });
    },
    logout: function(req, res) {
      req.session.destroy();
      res.clearCookie();
      res.send(200);
    }
  };
};
