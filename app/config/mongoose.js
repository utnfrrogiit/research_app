/**
 *  mongoose	-->	(Obj)	Objeto con las dependencias de la libreria mongoose
 *  db			-->	(Obj)	Objeto conexion de la base de datos
 */

module.exports = function(config, mongoose){

	//Conecto a la base de datos mediante el connectionString del objeto config
	mongoose.connect(config.db);

	//Seteo el objeto de conexion
	var db = mongoose.connection;

	//Muesto los logs por consola
	// db.on('error', console.error.bind(console, "Connection error"));

	db.once('open',
		function callback(){
			console.log('Connection to db opened');
		}
	);

  // Compile models
  require('../authentication/models');
}
