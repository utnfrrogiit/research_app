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
        request.user = user;
        next();
      }
      else {
        response.send(401); // HTTP Code for Unauthorized
      }
    })
  }
}
