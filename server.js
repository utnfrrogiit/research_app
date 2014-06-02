/**
 * 	environment	-->	(Str)	Variable de entorno de ejecucion
 *  express		-->	(Obj)	Objeto con las dependencias de la libreria express
 *  mongoose	-->	(Obj)	Objeto con las dependencias de la libreria mongoose
 *  passport	-->	(Obj)	Objeto con las dependencias de la libreria passport
 *  app 		-->	(Obj)	Objeto aplicacion
 *  config		-->	(Obj)	Objeto con las diferentes configuraciones de la aplicacions
 */

//Seteo la variable environment
var environment = 'development';

/* Cargo dependencias necesarias */
var config      = require('./app/config/config.js')[environment];
var express     = require('express');
var mongoose    = require('mongoose');
var passport    = require('passport');

//Inicializo el objeto App
var app         = express();



//Ejecuto los scripts necesarios
require('./app/config/mongoose.js')
	(config, mongoose);

require('./app/config/passport.js')
	(config, passport);

require('./app/config/express.js')
	(config, app, passport, express);

require('./app/authentication/routes.js')
	(config, app, passport);

//Inicio la aplicacion
app.listen(config.port);

//Muestro estado de la aplicacion por consola
console.log('Listening at '+ config.port+ " " + environment);
