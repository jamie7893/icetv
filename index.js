'use strict';

let server;

const
    express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    multer = require('multer'),
    Sequelize = require('sequelize'),
    bcrypt = require('bcrypt-nodejs'),
    crypto = require('crypto'),
    uuid = require('uuid'),
    config = require('./config.json'),
    cookieParser = require('cookie-parser'),
    sessionFileStore = require('session-file-store'),
    _ = require('lodash'),
    session = require('express-session');


let
    FileStore = sessionFileStore(session);


// Cookies
app.set('trust proxy', 1); // trust first proxy
var sess = {
    genId: function(req) {
        return uuid.v4();
    },
    name: 'thesis-sessions',
    secret: uuid.v4(),
    saveUnitialized: true,
    resave: true,
    store: new FileStore(),
    cookie: {
        secure: false
    }
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app
    .use(morgan('dev')) // logs request to the console
    .use(express.static(path.join(__dirname, 'public')))
    .use(session(sess))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

// Uploading Images
var uploading = multer({
    dest: './public/images/profile/',
    limits: {
        fileSize: 1000000,
        files: 1
    }
});


module.exports.close = function() {
    console.log('shutting down the server...');
    server.close();
};
// sequelize initialization //
// for heroku
const sequelize = new Sequelize('postgres://uzjeoebhaoxwuk:IVuScu6q96OjaUvc_fJBb8GVJl@ec2-54-163-254-231.compute-1.amazonaws.com:5432/denten10cruhtj');
// for local
// const sequelize = new Sequelize('postgres://postgres:admin@localhost:3000/postgres');

// require userService files
// example
// const colorsService = require("./service/colors")(sequelize);
const
    userService = require("./service/user.js")(sequelize),
    chatService = require("./service/chat.js")(sequelize);

var
    Chat = sequelize.import('./model/chatroom.js'),
    User = sequelize.import('./model/user.js'),
    UserChat = sequelize.import('./model/userchatroomjct.js'),
    Creds = sequelize.import('./model/credentials.js');

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('a user disconnected');

    });

    socket.on('joinedChat', function(data) {
        var chatId = data.chatId;
        var chatroomSocket = setInterval(function() {
            var messages = [];
            var users = [];
            Chat.findAll({
                where: {
                    idChatroom: chatId
                }
            }).then(function(messages) {
                var gettingMSG = _.map(messages, function(message) {
                    return User.findOne({
                        where: {
                            id: message.idSender
                        },
                    }).then(function(foundUser) {
                        message.dataValues.username = foundUser.dataValues.username;
                        message.dataValues.img = foundUser.dataValues.img;
                        return message.dataValues;
                    });
                });


                UserChat.findAll({
                    where: {
                        idChatroom: chatId
                    }
                }).then(function(chatroomUsers) {
                    var gettingUsers = _.map(chatroomUsers, function(chatroomUser) {
                        return User.findOne({
                            where: {
                                id: chatroomUser.idUser
                            },
                            attributes: ['username', 'img']
                        }).then(function(chatUsername) {
                            chatroomUser.dataValues.username = chatUsername.dataValues.username;
                            chatroomUser.dataValues.img = chatUsername.dataValues.img;
                            return chatroomUser.dataValues;
                        });
                    }); // end map
                    Promise.all(gettingMSG).then(function(message) {
                        Promise.all(gettingUsers).then(function(user) {
                            socket.emit('message', {
                                messages: message,
                                users: user
                            });
                        });
                    });
                });
            });
        }, 1000);
        socket.on('leaveChat', function(data) {
            clearInterval(chatroomSocket);
            UserChat.destroy({
                where: {
                    idUser: data.idUser
                }
            });
        });
    });
    //
    // setInterval(function() {
    //     socket.emit('message', {
    //         message: i
    //     });
    //     i++;
    // }, 1000);



});



sequelize.sync().then(function(res) {
        Chat.sync();
        User.sync();
        UserChat.sync();
        Creds.sync();

        app.route('/logout')
            .get(userService.logout);
        app.route('/updateprofile')
            .post(uploading.single('file'), userService.updateprofile);
        app.route('/signup')
            .post(userService.create);
        app.route('/login')
            .post(userService.login);
        app.route('/joinchat')
            .post(chatService.join)
            .get(chatService.get);
        app.route('/createMSG')
            .post(chatService.createMSG)
            .get(chatService.getMSG);

        // server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
        //     var addr = server.address();
        //     console.log("Server listening at", addr.address + ":" + addr.port);
        // });
        server = http.listen(1738, function() {
            var addr = server.address();
            console.log("Server listening at", addr.address + ":" + addr.port);

        });
    })
    .catch(function(e) {
        console.log('Error in sequelize.sync(): ' + e);
    });
