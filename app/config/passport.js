/**
 *	LocalStrategy	-->	(Obj)	Objeto de estategia(passport) utilizado para la autenticacion de usuarios
 * 	User 			-->	(Obj)	Modelo de dato del usuario 
 *  config			-->	(Obj)	Objeto con las diferentes configuraciones de la aplicacions	
 *  passport		-->	(Obj)	Objeto con las dependencias de la libreria passport
 *  user 			-->	(Obj)	Objeto usuario
 */

/* Seteo las dependencias necesarias */
var LocalStrategy = require('passport-local').Strategy;
var User          = require("../models/user");

module.exports = function(config, passport){


    //
    passport.serializeUser(
        function(user, done) {
            done(null, user.id);
        }
    );

    //
    passport.deserializeUser(
        function(id, done) {
            User.findById(id, 
                function(err, user) {
                    done(err, user);
                }
            );
        }
    );

	//Registro la estrategia 'local-login' encargada del logueo en forma local
	/**
	 *	Modifico los valores por defectos:
	 *		usernameField: 'username'
	 *		passwordField: 'password'
	 *		passReqToCallback: false
	 */
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
    	//Busco entre los usuarios en el modelo uno que tenga local.email igual al email ingresado
        User.findOne({ 'local.email' :  email }, 
        	function(err, user) {
        		//Si se produjo error devuelvo el mismo
	            if (err)
	                return done(err);

	            //Si no se encontro el usuario devuelvo false
	            if (!user)
	                return done(null, false);

	            //Si no es el password correcto devuelvo falso
	            if (!user.validPassword(password))
	                return done(null, false);

	            //Si llega aca el usuario fue encontrado e ingreso la password correspondiente
	            //por ende devuelvo el mismo
	            return done(null, user);
        	}
        );

    }));

};


