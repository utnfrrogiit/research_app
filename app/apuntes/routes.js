var Apunte = require('mongoose').model('Apunte');

var router = require('express').Router();

router.route('/apuntes')
  .get(function(request, response, next){
    // Get apuntes
  })

  .post(function(request, response, next){
    // Create apunte
  });

router.route('/apuntes/:id')
  .get(function(request, response, next){
    // Get apunte
  })

  .put(function(request, response, next){
    // Update apunte
  })

  .delete(function(request, response, next){
    // Remove apunte
  })

module.exports.list = function (request, response) {
  console.log("List llamado")
  var objects = Apunte.find({})
                      .limit(20)
                      .exec(function (error, apuntes) {
    console.log(apuntes);
    return response.json(apuntes);
  });
}

module.exports.create = function (request, response) {
  console.log('El create llamado');
  console.log(request.body);
  Apunte.create(request.body, function(err, apunte){
    if (!err){
      response.json(apunte);
    }
    response.json(err);
  });
}

module.exports = router;
