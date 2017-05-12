const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:admin@localhost:3000/postgres');
const User = sequelize.import('../model/user.js'),
  configAuth = require('./auth.js'),
  FacebookStrategy =  require('passport-facebook').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });


  passport.use(new YoutubeStrategy({
      clientID: "130735531663-qi8mjhphdinm8t1fumtjobemi5s1rotf.apps.googleusercontent.com",
      clientSecret: "B_xWrJRjtasXOy_40UIsotmR",
      callbackURL: "/auth/youtube/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ userId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log("This is profile: ", profile)
      User.findOrCreate({where: {userId: profile.id}, defaults: {job: 'Technical Lead JavaScript'}})
      .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)

    /*
      {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
  })
    }
  ));
}; //  the end
