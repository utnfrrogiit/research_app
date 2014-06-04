module.exports = function (error, request, response, next) {

  if (error.name === 'authError') {
    response.send(401);
  }

  if (error.name === 'ValidationError') {
    response.json(500, error.errors);
  }

  else {
    response.json(500, error);
  }
}
