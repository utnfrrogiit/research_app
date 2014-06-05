// Dependencias
var express = require('express');
var errorHandling = require('./app/config/errorHandling');
var bodyParser = require('body-parser');

// Configuración.
// Mongoose y Passport ya están configurados.
var config = require('./app/config/config.js');
var mongoose = require('./app/config/mongoose.js');
var passport = require('./app/config/passport.js');

var app = express();

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
var api = require('./app/authentication/routes.js');
app.use('/api', api);


app.use(errorHandling);

// Run
app.listen(config.port);
console.log('Listening at '+ config.port+ " " + config.runningEnvironment);
