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

// Auth middleware
app.use(passport.initialize());
var tokenAuthMiddleware = require('./app/authentication/middleware')
app.use(tokenAuthMiddleware);

// ROUTES

// API
var api = require('./app/authentication/routes.js');
app.use('/api', api);

// STATIC
app.use(express.static(config.rootPath + '/public'));

app.use(errorHandling);

// Run
app.listen(config.port);
console.log('Listening at '+ config.port+ " " + config.runningEnvironment);
