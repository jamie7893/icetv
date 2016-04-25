'use strict'
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
      join: function(req, res) {
        var user = req.body.idUser;
        var chatroom = req.body.idChat;
        userChatJct.findOne({
          where: {
            idUser: user
          }
        }).then(function(foundUser) {
          var newChat = {
            idChatroom: chatroom,
            idUser: user
          };
          if (foundUser) {
            userChatJct.update(newChat, {
              where: {
                idUser: user
              }
            });
          } else {
            userChatJct.create(newChat);
          }
        });
        res.send(200);
      },

      createMSG: function(req, res) {
        var newMSG = {
          idChatroom: req.body.chatId,
          message: req.body.message,
          idSender: parseInt(req.body.userId)
        };
        Chat.create(newMSG).then(function(theMSG) {
          res.send(200);
        });
      },
      getMSG: function(req, res) {
        Chat.findAll().then(function(chatroomMsgs) {
          var gettingMsgs = _.map(chatroomMsgs, function(chatroomMsg) {
            return User.findOne({
              where: {
                id: chatroomMsg.idSender
              },
              attributes: ['username', 'img']
            }).then(function(chatUsername) {
              chatroomMsg.dataValues.username = chatUsername.dataValues.username;
              chatroomMsg.dataValues.img = chatUsername.dataValues.img;
              return chatroomMsg.dataValues;
            });
          }); // end map
          Promise.all(gettingMsgs).then(function(data) {
            res.json(data);
          });
        });
      }
    };
    };
