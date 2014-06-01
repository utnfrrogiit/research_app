/**
 *	LocalStrategy	-->	(Obj)	Objeto de estategia(passport) utilizado para la autenticacion de usuarios
 * 	User 			-->	(Obj)	Modelo de dato del usuario
 *  config			-->	(Obj)	Objeto con las diferentes configuraciones de la aplicacions
 *  passport		-->	(Obj)	Objeto con las dependencias de la libreria passport
 *  user 			-->	(Obj)	Objeto usuario
 */

/* Seteo las dependencias necesarias */
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User          = require("../models/user");

module.exports = function(config, passport){

    passport.use(new BearerStrategy( function (token, done) {
        userid = jwt.decode(token, 'secret').userid;
        User.findOne({ id: userid }).exec(function(error, user){
          if (error) {
            return done(error);
          };

          if(!user){
            return done(null, false);
          }
        });

    }));

    passport.serializeUser(
        function(user, done) {
            if(user){
                done(null, user._id);
            }
        }
    );

    passport.deserializeUser(
        function(id, done) {
            User.findOne({_id: id})
                .exec(
                    function(err,user){
                        if(user){
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }
                )
        }
    );

    //Registro la estrategia 'local-login' encargada del logueo en forma local
    /**
     *  Modifico los valores por defectos:
     *      usernameField: 'username'
     *      passwordField: 'password'
     *      passReqToCallback: false
     */
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    function(email, password, done) {
        //Busco entre los usuarios en el modelo uno que tenga local.email igual al email ingresado
        User.findOne({ 'local.email':  email }).exec(
                function(err, user){
                    if(!user){
                        return done(null, false, 'err_1000');
                    } else {
                        if(!user.validPassword(password)){
                            return done(null, false, 'err_1001');
                        } else {
                            return done(null, user, 'err_0');
                        }
                    }
                }
            );

    }));











};
