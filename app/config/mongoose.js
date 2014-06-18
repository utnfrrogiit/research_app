var mongoose = require('mongoose');
var config = require('./config');

if ( config.runningEnvironment !== 'test' ) {
	mongoose.connect(config.db);

	mongoose.connection.on('error', console.error.bind(console, "Connection error"));

	mongoose.connection.on('connected', function(){
		console.log('Connection opened for ' + config.runningEnvironment + '.');
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Connection closed for ' + config.runningEnvironment + '.')
	})
}

/* Compile models. Acá hay que ir ejecutando los scripts
 models.js para que se vayan compilando los modelos a una
instancia temprana de inicio del server, para que luego
todas las partes de la aplicación que requieran los modelos
puedan usarlos tranquilas. */
require('../users/models');
require('../apuntes/models');

module.exports = mongoose;
