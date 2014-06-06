var Apunte = require('mongoose').model('Apunte');

var router = require('express').Router();

router.route('/apuntes')
  .get(function(request, response, next){
    // Get apuntes
    var apuntes = Apunte.find({}, function(error, apuntes){
      if (!error) {
        response.json(apuntes);
      }
      else {
        next(error);
      }
    });
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

module.exports = router;
