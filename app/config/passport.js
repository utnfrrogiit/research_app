var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

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

module.exports = passport;
