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
  session = require('express-session');


// Cookies
app.set('trust proxy', 1); // trust first proxy
var sess = {
  secret: 'mqpetbxmzodjyyesmfpqirhgncmxssfr',
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app
  .use(morgan('dev')) // logs request to the console
  .use(express.static(path.join(__dirname, 'public')))
  .use(session(sess))
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
const sequelize = new Sequelize('DB_NAME', 'DB_USER', 'DB_PASS', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
  }
});


// require userService files
// example
// const colorsService = require("./service/colors")(sequelize);





// import every model

sequelize.sync().then(function(res) {





    server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
      var addr = server.address();
      console.log("Server listening at", addr.address + ":" + addr.port);
    });
  })
  .catch(function(e) {
    console.log('Error in sequelize.sync(): ' + e);
  });
