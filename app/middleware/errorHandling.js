module.exports = function (error, request, response, next) {

  if (error.name === 'ValidationError') {
    response.json(400, {
        error: 'ValidationError',
        errors: error.errors
    });
  }

  else {
    console.log(error.stack);
    response.json(500, error);
  }
}
