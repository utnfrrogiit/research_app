require('./models');
var mongoose = require('mongoose');
var handleError = require('../config/errorHandling');

var authError = Error('Unauthorized');
authError.name = 'authError';

var User = mongoose.model('User');

module.exports = function (config, app, passport) {
  app.post('/authenticate', function (request, response, next) {
    passport.authenticate('local-login', function (error, user) {
      if (error) {
        return next(error);
      }
      if (!user) {
        //Devolver error not user
        return next(authError);
      }
      //Generar y devolver token
      user.generateTokenAndSave(function(error, token){
        if (!error){
          response.json({userid: user.id, access_token: token});
        }
        else{
          next(error);
        }
      });
    })(request, response, next);
  });

  app.route('/users')
      // Get users
     .get(function (request, response) {
       User.find({}, function(error, users) {
         if (!error) {
           response.json(users);
         }
         else {
           next(error);
         }
       })
     })

     // Create User
     .post(function (request, response) {
       var user = new User(request.body);
       user.password = user.generateHash(request.body.password);
       user.save(function (error, user){
         if (!error) {
           user.generateTokenAndSave(function(error, token){
             response.json(201, {userid: user.id, access_token: token});
           })
         }
         else {
           next(error);
         }
       })
     });
     // Put y delete no tienen sentido para /users

  app.route('/users/:id')
     // Get user
     .get(function (request, response) {
       User.findOne({_id: request.params.id}, function(error, user){
         if(!error){
           response.json(user);
         }
         else {
           next(error);
         }
       })
     })

     // Update user
     .put(function (request, response) {
       User.findByIdAndUpdate(request.params.id, request.body, {}, function(error, user){
         if(!error){
           response.send(200);
         }
         else{
           next(error);
         }
       })
     })


}
