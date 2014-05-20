/**
 *	angularApp	-->	(Obj)	Objeto contenedor de la aplicacion
 * 	User 		-->	(Sin)	Singleton de usuarios
 */

//Inicializo el modulo de la aplicacion
var angularApp = angular.module('studentApp', ['ngResource', 'ngRoute'] );

//Configuro los ruteos y ubicaciones de la aplicacion
angularApp
	.config(function($locationProvider,$routeProvider) {
     	
     	//Activo el html5 para que la url sea '/'
        $locationProvider.html5Mode(true);
        
        //Seteo los ruteos de la aplicacion
        $routeProvider
            /*  */

            .when('/app/index', {
                templateUrl: '/app/partials/studentApp/index.html',
                controller: 'indexCtrl'
            })

        	.when('/app/', {
        		templateUrl: '/app/partials/studentApp/index.html',
        		controller: 'indexCtrl'
        	})

        	.otherwise({
        		redirectTo: '/app/'
        	});      			

  
    });

//Defino el singleton de usuario
/* Falta generar un archivo comun para no hacer redundancia de codigo */
angularApp
    .service('User', 
        function(){

            //Bandera de inicializacion
            this.initialized = false;

            //Llamar para instanciar el objeto generado por el singleton en caso de ser vacio
            this.Init = function(user){
                this.local = {
                    firstName:  user.local.firstName,
                    lastName:   user.local.lastName,
                    email:      user.local.email,
                    userType:   user.local.userType
                };

                this.initialized = true;
            }

            //Verifica si esta inicializado
            this.IsInitialized = function(){
                return this.initialized;
            }

        }
    );    

angularApp
    .controller('headCtrl', 
        function($scope, $http, $location, $window, User){

            $scope.Init = function(){          

                $http
                    .post('/app/index/initApp')
                    .then(
                        function(response){
                            $scope.user = User;
                            $scope.user.Init(response.data.user);
                        }
                    );

            }; 

        }
    );  

angularApp
    .controller('headerCtrl', 
        function($scope, $http, $location, $window){

        }
    );      

angularApp
    .controller('indexCtrl', 
        function($scope, $http, $location, $window){

        }
    );          