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
var errorHandling = require('./app/config/errorHandling');
var bodyParser = require('body-parser');

//Inicializo el objeto App
var app         = express();



//Ejecuto los scripts necesarios
require('./app/config/mongoose.js')
	(config, mongoose);

require('./app/config/passport.js')
	(config, passport);

// Start lo que solia ser express.js
app.use(bodyParser());

app.set('view engine', 'ejs');

app.set('views', config.rootPath + '/public/app/views');

app.set('view options', { layout:false, root: config.rootPath + '/public/app/views' } );

app.use(express.static(config.rootPath + '/public'));

app.use(passport.initialize());

var tokenAuthMiddleware = require('./app/authentication/middleware')
app.use(tokenAuthMiddleware);

//End lo que solia ser express.js

require('./app/authentication/routes.js')
	(config, app, passport);

app.use(errorHandling);

//Inicio la aplicacion
app.listen(config.port);

//Muestro estado de la aplicacion por consola
console.log('Listening at '+ config.port+ " " + environment);
