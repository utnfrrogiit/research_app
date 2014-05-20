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


var path = require('path');
var rootPath = path.normalize( __dirname + '/../../' );


module.exports = {
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
    }


}

