module.exports = function (error, request, response, next) {

  if (error.name === 'authError') {
    response.send(401);
  }
  else {
    console.error('Server error: ', error);
    response.json(500, error);
  }
}
