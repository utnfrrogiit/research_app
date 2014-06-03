var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(config, passport){

    /* Bearer Strategy for token authentication */
    passport.use(new BearerStrategy( function (token, done) {
        User.findByToken(token, function(error, user){
          if (error) {
            return done(error, false);
          };

          if(!user){
            return done(null, false);
          }

          return done(null, user);
        });

    }));

    /* local-login Strategy for email-password authentication */
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    function(email, password, done) {
        User.findOne({ email:  email },
                function(err, user){
                    if(!user){
                        return done(null, false);
                    } else {
                        if(!user.validPassword(password)){
                            return done(null, false);
                        } else {
                            return done(null, user);
                        }
                    }
                }
            );

    }));











};
