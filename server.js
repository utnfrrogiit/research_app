// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

// Configuración.
// Mongoose y Passport ya están configurados.
var config = require('./app/config/config.js');
var mongoose = require('./app/config/mongoose.js');
var passport = require('./app/config/passport.js');

var app = express();

app.use(bodyParser());
app.use(multer({dest: '/var/tmp'}));

// Auth middleware
app.use(passport.initialize());
app.use(require('./app/middleware/authentication.js'));

app.use(require('./app/middleware/mongooseQuery.js'))

// ROUTES

// API
var api = express.Router();

api.use(require('./app/users/routes.js'));
api.use(require('./app/apuntes/routes.js'));

app.use('/api', api);

// Static
app.use('/uploads/', express.static(config.rootPath + '/uploads'));
app.use(express.static(config.rootPath + '/public'));

// Error Middleware
app.use(require('./app/middleware/errorHandling'));

// Run
app.listen(config.port);
console.log('Listening at '+ config.port+ " " + config.runningEnvironment);
