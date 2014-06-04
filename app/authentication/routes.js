require('./models');
mongoose = require('mongoose');

User = mongoose.model('User');

module.exports = function (config, app, passport) {
  app.post('/authenticate', function (request, response, next) {
    passport.authenticate('local-login', function (error, user) {
      if (error) {
        return response.send(500);
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
          response.send(500);
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
           response.send(500);
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
           error.send(500);
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
           response.send(500);
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
           response.send(500);
         }
       })
     })


}
