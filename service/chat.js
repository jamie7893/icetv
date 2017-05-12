'use strict'
const _ = require('lodash'),
  botConfig = require('../config/config.js'),
   refresh = require('passport-oauth2-refresh'),
  request = require('request');

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
        console.log(req)
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.session.accessToken
          }

          // Configure the request
          var options = {
              url: "https://www.googleapis.com/youtube/v3/liveChat/messages",
              method: 'POST',
              headers: headers,
              json: {
                "snippet": {
                  "liveChatId": botConfig.stream.liveChatId,
                  "type": "textMessageEvent",
                  textMessageDetails: {
                    messageText: req.body.message
                  }
                }
              }
            }
              // Start the request
              request(options, function(error, response, body) {

                if (!error && response.statusCode == 200) {
                  // Print out the response body
                  console.log("sent the message!")
                } else {
                  // console.log(response)
                }
              });
            },
            getMSG : function(req, res) {
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
