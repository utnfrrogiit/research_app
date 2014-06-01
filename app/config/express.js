/**
 *  cookieParser	-->	(Obj)	Objeto con las dependencias de la libreria cookie-parser
 *  session			-->	(Obj)	Objeto con las dependencias de la libreria express-session
 *  bodyParser		-->	(Obj)	Objeto con las dependencias de la libreria body-parser
 *  config			-->	(Obj)	Objeto con las diferentes configuraciones de la aplicacions
 *  app 			-->	(Obj)	Objeto aplicacion
 *  passport		-->	(Obj)	Objeto con las dependencias de la libreria passport
 *  express			-->	(Obj)	Objeto con las dependencias de la libreria express
 */



/* Cargo dependencias necesarias */
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

module.exports = function(config, app, passport, express){

	app.use(cookieParser());
	app.use(bodyParser());

	app.set('view engine', 'ejs');

	app.set('views', config.rootPath + '/public/app/views');

	app.set('view options', { layout:false, root: config.rootPath + '/public/app/views' } );

	app.use(express.static(config.rootPath + '/public'));

	app.use(session({secret: 'research'}));
	app.use(passport.initialize());
	app.use(passport.session());

}
