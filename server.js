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

// Dependencias
var config      = require('./app/config/config.js')[environment];
var express     = require('express');
var mongoose    = require('mongoose');
var passport    = require('passport');
var errorHandling = require('./app/config/errorHandling');
var bodyParser = require('body-parser');

var app = express();



// Configuración
require('./app/config/mongoose.js')
	(config, mongoose);

require('./app/config/passport.js')
	(config, passport);


app.use(bodyParser());

// Render engine. Pronto a volar.
app.set('view engine', 'ejs');
app.set('views', config.rootPath + '/public/app/views');
app.set('view options', { layout:false, root: config.rootPath + '/public/app/views' } );
app.use(express.static(config.rootPath + '/public'));

// Auth middleware
app.use(passport.initialize());
var tokenAuthMiddleware = require('./app/authentication/middleware')
app.use(tokenAuthMiddleware);

// ROUTES

// API
var api = require('./app/authentication/routes.js')(config, passport);
app.use('/api', api);


app.use(errorHandling);

// Run
app.listen(config.port);
console.log('Listening at '+ config.port+ " " + environment);
