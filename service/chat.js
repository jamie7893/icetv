'use strict'
const _ = require('lodash'),
  botConfig = require('../config/config.js'),
   refresh = require('passport-oauth2-refresh'),
  request = require('request');

  module.exports = function(sequelize) {
    var User = sequelize.import ("../model/user");

    return {
      join: function(req, res) {
console.log("join")
      },

      createMSG: function(req, res) {
      let sess = req.user
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sess.accessToken
          }

          // Configure the request
          var options = {
              url: "https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet",
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
                res.json({messageSent: true})
                } else {
                res.json({messageSent: false})
                }
              });
            },
            getMSG : function(req, res) {
console.log("getMSG")
            }
        };
      };
