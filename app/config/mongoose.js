var mongoose = require('mongoose');
var config = require('./config');
var dbUtils = require('./dbUtils');

if ( config.runningEnvironment !== 'test' ) {
	dbUtils.connect(config.db);
}

/* Compile models. Acá hay que ir ejecutando los scripts
 models.js para que se vayan compilando los modelos a una
instancia temprana de inicio del server, para que luego
todas las partes de la aplicación que requieran los modelos
puedan usarlos tranquilas. */
require('../users/models');
require('../apuntes/models');

module.exports = mongoose;
