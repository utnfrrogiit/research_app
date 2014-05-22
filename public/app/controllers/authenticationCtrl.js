/**
 *	angularApp	-->	(Obj)	Objeto contenedor de la aplicacion
 * 	User 		-->	(Sin)	Singleton de usuarios
 */

//Inicializo el modulo de la aplicacion
var angularApp = angular.module('authenticationApp', ['ngResource', 'ui.router', 'ngRoute'] );

//Configuro los ruteos y ubicaciones de la aplicacion
angularApp
	.config(
		function($locationProvider, $stateProvider, $urlRouterProvider) {
     	
     	//Activo el html5 para que la url sea '/'
        $locationProvider.html5Mode(true);
        
		$urlRouterProvider.otherwise("/login");

		$stateProvider
			.state('login', {
				url: "/login",
				templateUrl: "/app/partials/authentication/login.html",
				controller: function($scope, $state, $http, $location, $route, $window, User){
					//Defino funcion de logueo
					$scope.Login = function(email, password){
						
						//Ejecuto comando post a la direccion '/login' espero a que el ruteo de el servidor responda
						$http
							.post("/login", {email: email, password: password})
							//En cuanto responde
							.then(
								function(response){
									//Valido si el logueo fue exitoso sino lo envio a '/signup'
									if(!response.data.error.value){

										//Inicializo el usuario en modo singleton														
										$scope.user = User;
										$scope.user.Init(response.data.user);

										//Valido si el usuario ya tiene seteado el tipo de usuario para luego definir a que modulo redirigir en el servidor
										if($scope.user.local.userType == null){
											//En caso de ser nulo lo redirijo a '/user' para que setee este valor
											$state.go('user');
										} else {									
											//Realizo la redireccion a la aplicacion principal
											var newUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/app/index";
											$window.location.href = newUrl;									
										}

									} else {
										
										
									}
					
								}
							);
					};

				}
			})
			
			.state('forgot', {
				url: '/forgot',
				templateUrl: "/app/partials/authentication/forgot.html",
				controller: function($scope, $state, $http, $location, $window){

					$scope.Reset = function(){			

					};	
									
				}
			})

			.state('signup', {
				url: '/signup',
				templateUrl: "/app/partials/authentication/signup.html",
				controller: function($scope, $state, $http, $location, $window){

					//Defino la funcion de registro
					$scope.SignUp = function(firstName, lastName, email, password, confirmPassword){			
						//Valido si las contraseñas pedidas son iguales
						if(password == confirmPassword){

							//Ejecuto comando post a '/signup' para que el routeo del servidor actue, una ves que respoonda
							$http
								.post("/signup", {firstName: firstName, lastName: lastName, email: email, password: password})
								//Cuando responde
								.then(
									function(response){

										if(response.data.success){			
											$state.go('login');
										} else {
											$state.go('signup');
										}

									}
								);					
						}
					};

				}
			})	

			.state('user', {
				url: '/user',
				templateUrl: "/app/partials/authentication/user.html",
				controller: function($scope, $http, $location, $window, User){
					
					//Recupero el ususario del singleton ya que esta inicializado y con los valores correspondientes
					$scope.user = User;

					//Seteo los valores posibles para el comboBox
					$scope.userTypes = [
						{ text: 'Alumno'	, value: 1},
						{ text: 'Docente'	, value: 2},
						{ text: 'Personal'	, value: 3}
					];

					//Marco la variable correspondiente al modelo selectedUserType
					$scope.selectedUserType = $scope.userTypes[0];

					//Defino la funcion Continue
					$scope.Continue = function(){

						//Asigno el valor userType y redirijo
						$scope.user.local.userType = $scope.selectedUserType;

						var newUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/app/index";

						$window.location.href = newUrl;

					}

				}
			})					

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
					firstName: 	user.local.firstName,
					lastName: 	user.local.lastName,
					email: 		user.local.email,
					userType: 	user.local.userType
				};

				this.initialized = true;
			}

			//Verifica si esta inicializado
			this.IsInitialized = function(){
				return this.initialized;
			}

		}
	);
