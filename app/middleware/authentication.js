User = require('mongoose').model('User')


/*
Token Auth Middleware. Identifica a un usario en base
al header Authorization.
*/

module.exports = function (request, response, next) {
  var auth_token = request.get('Authorization');

  if ( !auth_token ) {
    next();
  }

  else {
    User.findByToken(auth_token, function(error, user){
      if (user) {

        //Actualizar lastUsed del token
        for (var i = 0; i < user.tokens.length; i++) {
          if (user.tokens[i].token === auth_token) {
            user.tokens[i].lastUsed = Date.now();
            user.save(function(error){
              request.user = user;
              next();
              return;
            })
          }
        }

      }
      else {
        response.send(401); // HTTP Code for Unauthorized
      }
    })
  }
}
