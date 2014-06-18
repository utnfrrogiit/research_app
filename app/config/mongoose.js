var mongoose = require('mongoose');
var config = require('./config');

if ( config.runningEnvironment !== 'test' ) {

	//Conecto a la base de datos mediante el connectionString del objeto config
	mongoose.connect(require('./config').db);

	//Seteo el objeto de conexion
	var db = mongoose.connection;

	//Muesto los logs por consola
	db.on('error', console.error.bind(console, "Connection error"));

	db.once('open',
		function callback(){
			console.log('Connection to db opened for ' + config.runningEnvironment);
		}
	);
}

/* Compile models. Acá hay que ir ejecutando los scripts
 models.js para que se vayan compilando los modelos a una
instancia temprana de inicio del server, para que luego
todas las partes de la aplicación que requieran los modelos
puedan usarlos tranquilas. */
require('../users/models');
require('../apuntes/models');

module.exports = mongoose;
