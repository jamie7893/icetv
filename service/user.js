'use strict';
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
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
          nameFirst: req.body.nameFirst

        };
        var aSalt = bcrypt.genSaltSync(10);

        var aHash = bcrypt.hashSync(req.body.password, aSalt);

        var newPass = {
          hash: aHash
        };
        Creds.create(newPass).then(function() {
          User.create(newUser).then(function(aNewUser) {

            var date = new Date();
            var minutes = 30;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            res.cookie("name", aNewUser.nameFirst, {
              expires: date
            });
            res.cookie("id", aNewUser.id, {
              expires: date
            });
            res.redirect('/profile');
          });
        });
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
        var userProfile = {
          nameLast: req.body.nameLast,
          nameFirst: req.body.nameFirst,
          desc: req.body.desc,
          img: req.body.img

        };
        // console.log(userProfile);
        User.update(userProfile, {
          where: {
            id: user.id
          }
        });
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
          }],
          attributes: []

        }).then(function(password) {
          console.log(password);
          if (bcrypt.compareSync(req.body.password, password[0].userpassword.hash)) {
            sess.email = req.body.email;
            User.findOne({
              where: {
                email: req.body.email
              }
            }).then(function(user) {
              var date = new Date();
              var minutes = 30;
              date.setTime(date.getTime() + (minutes * 60 * 1000));
              res.cookie("name", user.nameFirst, {
                expires: date
              });
              res.cookie("id", user.id, {
                expires: date
              });
            });
          }
        });

      });
    },
    logout: function(req, res) {
        req.session.destroy();
        res.clearCookie();
      }
  };
};
