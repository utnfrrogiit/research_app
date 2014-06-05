var passport = require('../config/passport');
var config = require('../config/config');

var User = require('mongoose').model('User');

var api = require('express').Router();
api.post('/users/authenticate', function (request, response, next) {
  passport.authenticate('local-login', function (error, user) {
    if (error) {
      return next(error);
    }
    if (!user) {
      //Devolver error not user
      return response.send(401);
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

api.route('/users')
    // Get users
   .get(function (request, response, next) {
     var fields = 'firstName lastName';
     User.find({}, fields, {lean: true}, function(error, users) {
       if (!error) {
         response.json(users);
       }
       else {
         next(error);
       }
     })
   })

   // Create User
   .post(function (request, response, next) {
     var user = new User(request.body);
     if (user.password) {
       user.password = user.generateHash(request.body.password);
     }
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

api.route('/users/:id')
   // Get user
   .get(function (request, response, next) {

     if (request.user && request.user._id.equals(request.params.id)) {
       var fields = 'firstName lastName email'
     }
     else {
       var fields = 'firstName lastName'
     }

     User.findOne({_id: request.params.id}, fields, {lean: true}, function(error, user){
       if(error){
         return next(error);
       }

       if (!user) {
         return response.send(404);
       }
       response.json(user);
     })
   })

   // Update user
   .put(function (request, response, next) {
     if (request.user && request.user._id.equals(request.params.id)) {
       User.findByIdAndUpdateUser(request.params.id, request.body, {}, function(error, user){
         if(!error){
           response.send(200);
         }
         else{
           next(error);
         }
       })
    }
    else {
      response.send(401);
    }
   })

   .delete(function (request, response, next) {
     if (request.user && request.user._id.equals(request.params.id)) {
       User.remove({_id: request.params.id}, function(error, user){
         if (!error) {
           response.send(200);
         }
         else {
           next(error);
         }
       })
    }
    else {
      response.send(401);
    }
   })

module.exports = api;
