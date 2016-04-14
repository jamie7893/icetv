'use strict';

let server;

const
  express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  multer = require('multer'),
  Sequelize = require('sequelize'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto'),
  uuid = require('uuid'),
  config = require('./config.json'),
  cookieParser = require('cookie-parser'),
  sessionFileStore = require('session-file-store'),
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
  dest: './path/to/img/dir/',
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



// import every model

sequelize.sync().then(function(res) {
    Chat.sync();
    User.sync();
    UserChat.sync();
    Creds.sync();

    app.post('/gravatar', function(req, res) {
      var email = req.body.email;
      var hash = crypto.createHash('md5').update(email).digest('hex');
      res.send(hash);

    });
    app.route('/logout')
      .get(userService.logout);
    app.route('/updateprofile')
      .put(userService.updateprofile);
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



    server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
      var addr = server.address();
      console.log("Server listening at", addr.address + ":" + addr.port);
    });
  })
  .catch(function(e) {
    console.log('Error in sequelize.sync(): ' + e);
  });
