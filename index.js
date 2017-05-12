'use strict';

let server;

const express = require('express'),
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
  passport = require('passport'),
  uuid = require('uuid'),
  refresh = require('passport-oauth2-refresh'),
  botConfig = require('./config/config.js'),
  ymi = require('ymi.js'),
  cookieParser = require('cookie-parser'),
  sessionFileStore = require('session-file-store'),
  _ = require('lodash'),
  YoutubeV3Strategy = require('passport-youtube-v3').Strategy,
  session = require('express-session');

let FileStore = sessionFileStore(session);

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
  },
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
// sequelize initialization //
// for heroku
// const sequelize = new Sequelize('postgres://uzjeoebhaoxwuk:IVuScu6q96OjaUvc_fJBb8GVJl@ec2-54-163-254-231.compute-1.amazonaws.com:5432/denten10cruhtj');
// for local
const sequelize = new Sequelize('postgres://postgres:admin@localhost:3000/postgres');

// require userService files
// example
// const colorsService = require("./service/colors")(sequelize);
const userService = require("./service/user.js")(sequelize),
  chatService = require("./service/chat.js")(sequelize);

var Chat = sequelize.import ('./model/chatroom.js'),
  User = sequelize.import ('./model/user.js'),
  UserChat = sequelize.import ('./model/userchatroomjct.js'),
  Creds = sequelize.import ('./model/credentials.js');

passport.serializeUser(function(user, done) {
  done(null, user.userId)
});

passport.deserializeUser(function(id, done) {
  console.log("deserilize")
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

let strategy = new YoutubeV3Strategy({
  clientID: "250381024969-dt3rtrinho44e5idof02lg09jhp26no8.apps.googleusercontent.com",
  clientSecret: "1uVhvUpHkL8CTPZp4pU8n-Wl",
  callbackURL: "/auth/youtube/callback",
  scope: ['https://www.googleapis.com/auth/youtube.readonly']
}, function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ userId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  User.findOrCreate({
    where: {
      userId: profile.id
    },
    defaults: {
      displayName: profile.displayName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      color: "purple"
    }
  }).spread(function(user, created) {
    if (user) {
      return User.update({
          userId: profile.id,
        displayName: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        color: "purple"
      }, {
  where: { userId: profile.id }
}).then(function(data) {
    return done(null, data.dataValues);
})
}
  }).catch(function(err) {
    return done(err, null)
    console.log(err)
  });
});
passport.use(strategy);
app.use(morgan('dev')). // logs request to the console
use(express.static(path.join(__dirname, 'src'))).set('view engine', 'jsx').engine('jsx', require('express-react-views').createEngine()).use(session(sess)).use(cookieParser()).use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

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
const config = {
  oauth: {
    client_id: botConfig.oauth.client_id,
    client_secret: botConfig.oauth.client_secret,
    access_token: botConfig.oauth.access_token,
    refresh_token: botConfig.oauth.refresh_token
  },
  live_chat_id: botConfig.stream.liveChatId,
  page_token: null
}

const client = new ymi.client(config);
let currentMessages = {},
  times;

client.on('connected', () => {
  console.log("connected")
})

setInterval(() => {
  client.refresh()
}, botConfig.stream.refreshTokenTime)

client.on('chat', (user, message) => {
  console.log({user:user, message:message});
  io.emit('message', {user:user, message:message});
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('a user disconnected');

  });

  socket.on('joinedChat', function(data) {
    UserChat.findAll({
      where: {
        idChatroom: "ice_poseidon"
      }
    }).then((viewers) => {
      io.emit("users", {
        users: viewers.map(function(viewer) {
          return {username: viewer.username, idUser: viewer.idUser}
        }),
        venue: {
          name: "ice_poseidon"
        },
        idChat: "ice_poseidon"
      });
    });
  });
});
client.connect()
sequelize.sync().then(function(res) {
  Chat.sync();
  User.sync();
  UserChat.sync();
  Creds.sync();

  app.route('/').get(function(req, res) {
    res.render('./src/client.min.js');
  });
  app.route('/logout').get(userService.logout);
  app.route('/updateprofile').post(uploading.single('file'), userService.updateprofile);
  app.route('/signup').post(userService.create);
  app.route('/login').post(userService.login);
  app.route('/joinchat').post(chatService.join);
  app.route('/message').post(chatService.createMSG);

  app.get('/auth/youtube', passport.authenticate('youtube'));

  app.get('/auth/youtube/callback', passport.authenticate('youtube', {failureRedirect: '/#/login'}), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/chatroom');
  });

  // server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
  //     var addr = server.address();
  //     console.log("Server listening at", addr.address + ":" + addr.port);
  // });
  server = http.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);

  });
}).catch(function(e) {
  console.log('Error in sequelize.sync(): ' + e);
});
