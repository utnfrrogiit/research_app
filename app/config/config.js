/**
 *  production          --> (Obj)   Contiene las variables de el objeto config para el entorno de produccion
 *  development         --> (Obj)   Contiene las variables de el objeto config para el entorno de desarrollo
 *
 *  path                --> (Obj)   Objeto con las dependencias de la libreria path
 *  rootPath            --> (Str)   Direccion root de la aplicacion
 *  runningEnvironment  --> (Str)   Entorno de ejecucion
 *  db                  --> (Str)   ConnectionString de la base de datos
 *  port                --> (Str)   Puerto en el que se ejecutara la aplicacion
 */

//Seteo la variable environment
var environment = process.env.NODE_ENV;

var path = require('path');
var rootPath = path.normalize( __dirname + '/../../' );


var config = {
    production: {
        runningEnvironment: 'production',
        rootPath: rootPath,
        db: "mongodb://localhost/research_app_prod",
        port: "8080"
    },
    development: {
        runningEnvironment: 'development',
        rootPath: rootPath,
        db: "mongodb://localhost/research_app_dev",
        port: "8000"
    },
    test: {
      runningEnvironment: 'test',
      rootPath: rootPath,
      db: "mongodb://localhost/research_app_test",
      port: "8000"
    }
}

module.exports = config[environment];
