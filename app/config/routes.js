/**
 *  config			-->	(Obj)	Objeto con las diferentes configuraciones de la aplicacions
 *  app 			-->	(Obj)	Objeto aplicacion
 *  passport		-->	(Obj)	Objeto con las dependencias de la libreria passport
 *
 *
 */

var Response = require('../classes/Response.js');
var jwt = require('jwt-simple')
var authRoutes = require('../authentication/routes')


module.exports = function(config, app, passport){

  /** AUTH ROUTES **/

  require('../authentication/routes')(config, app, passport)











	/**
	 *	Routes tipo GET
	 */

	app.get('/authentication', function(req, res){

	    var dataEJS = {};
	    res.render('authentication.ejs', dataEJS);
	});

	app.get('/app/index', isLoggedIn, function(req, res){
		res.render("studentIndex.ejs");
	});


	app.get('*', function(req, res){
		var dataEJS = {};
		res.render("authentication.ejs", dataEJS);
	});


	/**
	 *	Routes tipo POST
	 */

	app.post('/signup',
		function(req,res,next){

			var firstName = req.body.firstName;
			var lastName = req.body.lastName;
			var email    = req.body.email;
			var password = req.body.password;

			var User     = require("../models/user");

			User.findOne( {'email': email},
				function(err, user){

					if(err){
						res.send( {success:false, flag: 1, message: "Internal Server Error"} );
					}

					if(user){
						res.send( {success:false, flag: 2, message: "This user already exists"} );
					} else {


		                var newUser	= new User();

		                newUser.local.email    = email;
		                newUser.local.password = newUser.generateHash(password);
		                newUser.local.firstName = firstName;
		                newUser.local.lastName = lastName;

		                newUser.save(function(err) {

		                    if (err){
		                        throw err;
		                    }

		                    res.send( {success: true, flag: 0, message: "User registered"} );

		                });
					}
				}
			);
		}
	);



	app.post('/login',
		function(req, res, next) {
			passport.authenticate('local-login',
				function(err, user, errorID) {

					if (err) {
						return next(err);
					}

					if (!user) {

						//Devolver error not user
            res.json({success: false});
					}

					//Generar y devolver token
          var token = jwt.encode({userid: user.id}, 'secret');
          res.json({userid: user.id, access_token: token});

				}
			)(req, res, next);
		}
	);

	app.post('/app/index/initApp', isLoggedIn, function(req, res){
		var user = req.user;

		var limitedUser = {
			local: {
				firstName: user.local.firstName,
				lastName: user.local.lastName,
				email: user.local.email,
				usertType: user.local.usertType
			}
		}


		res.send({user: limitedUser});
	});

};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
