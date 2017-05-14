'use strict';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
  } else {


let server;

const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  http = require('http').Server(app),
  // io = require('socket.io')(http),
  Sequelize = require('sequelize'),
  passport = require('passport'),
  uuid = require('uuid'),
  botConfig = require('./config/config.js'),
  ymi = require('ymi.js'),
  twitchEmoji = require('twitch-emoji'),
  cookieParser = require('cookie-parser'),
  sessionFileStore = require('session-file-store'),
  YoutubeV3Strategy = require('passport-youtube-v3').Strategy,
  session = require('express-session');
  const { EmoteFetcher, EmoteParser } = require('twitch-emoticons');
  const fetcher = new EmoteFetcher();
  const parser = new EmoteParser(fetcher, {
      type: 'html',
      match: /\b(.+?)\b/gi
  });

let FileStore = sessionFileStore(session);

// Cookies
app.set('trust proxy', 1); // trust first proxy
var sess = {
  genId: function(req) {
    return uuid.v4();
  },
  name: 'purplearmy-session',
  secret: uuid.v4(),
  saveUnitialized: true,
  resave: true,
  store: new FileStore(),
  cookie: {
    secure: false,
    maxAge: 10 * 365 * 24 * 60 * 60
  },
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
// sequelize initialization //
// for heroku
const sequelize = new Sequelize('postgres://ygvmxxpruktqks:a2cf84a2c3913d904db39cc306f5a325b92faf725ec6be4e8ed4680fbe0ec198@ec2-54-235-72-121.compute-1.amazonaws.com:5432/danial6j1igreh');
// for local
// const sequelize = new Sequelize('postgres://postgres:admin@localhost:3000/postgres');

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
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  User.findById(user.userId).then(function(data) {
        done(null, data.dataValues);
  });
});

let strategy = new YoutubeV3Strategy({
  clientID: "250381024969-dt3rtrinho44e5idof02lg09jhp26no8.apps.googleusercontent.com",
  clientSecret: "1uVhvUpHkL8CTPZp4pU8n-Wl",
  callbackURL: "/auth/youtube/callback",
  scope: ['https://www.googleapis.com/auth/youtube']
}, function(accessToken, refreshToken, profile, done) {
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
    if (user.dataValues) {
      return done(null, user.dataValues);
    }
  }).catch(function(err) {
    console.log(err)
    return done(err)
  });
});
// passport.use(strategy);
// app.use(morgan('dev')). // logs request to the console
// use(express.static(path.join(__dirname, 'src'))).set('view engine', 'jsx').engine('jsx', require('express-react-views').createEngine()).use(session(sess)).use(cookieParser()).use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
// app.use(passport.initialize());
// app.use(passport.session());

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

// const client = new ymi.client(config);

// setInterval(() => {
//   client.refresh()
// }, botConfig.stream.refreshTokenTime);
// client.on('chat', (user, message) => {
//   fetcher.fetchTwitchEmotes().then(() => {
//   message.displayMessage = parser.parse(message.displayMessage)
//   fetcher.fetchBTTVEmotes().then(() => {
//   message.displayMessage = parser.parse(message.displayMessage)
//   io.emit('message', {
//     user: user,
//     message: message
//   });
//   }).catch(function(err) {
//
//   });
// }).catch(function(err) {
//
// });
//
//   // message.displayMessage = twitchEmoji.parse(message.displayMessage)
//
// });

// client.connect();
sequelize.sync().then(function(res) {
  // User.sync();

  app.route('/').get(function(req, res) {
    res.render('./src/client.min.js');
  });
  app.route('/isLoggedIn').get(userService.isLoggedIn);
  app.route('/logout').get(userService.logout);
  app.route('/refreshToken').get(isAuthenticated, userService.refresh);
  app.route('/updateprofile').post(uuserService.updateprofile);
  app.route('/login').post(userService.login);
  app.route('/joinchat').post(chatService.join);
  app.route('/message').post(chatService.createMSG);

  app.get('/auth/youtube', passport.authenticate('youtube'));

  app.get('/auth/youtube/callback', passport.authenticate('youtube', {failureRedirect: '/#/login'}), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/chatroom');
  });
  function isAuthenticated(req, res, next) {
    // do any checks you want to in here
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user)
        return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
      res.json({"redirect": true})
}

  // server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
  //     var addr = server.address();
  //     console.log("Server listening at", addr.address + ":" + addr.port);
  // });
  server = http.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
  });
}).catch(function(e) {
  console.log('Error in sequelize.sync(): ' + e);
});
}
