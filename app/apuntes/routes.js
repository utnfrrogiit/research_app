var Apunte = require('mongoose').model('Apunte');
var fs = require('fs');
var path = require('path');
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
    var tempPath = request.files.file.path;
    var newPath = path.join('uploads/apuntes/', request.files.file.name);

    fs.rename(tempPath, newPath, function(error){
      if (error) {
        next(error);
      }
    });

    // Create apunte
    var apunte = new Apunte(request.body);
    apunte.filePath = newPath;
    apunte.save(function(error, apunte){
      if (!error) {
        response.json({id: apunte.id});
      }
      else {
        next(error);
      }
    })
  });

router.route('/apuntes/:id')
  .get(function(request, response, next){
    // Get apunte
    Apunte.findById(request.params.id, function(error, apunte){
      if (error) {
        return next(error);
      }
      if (!apunte) {
        return response.send(404);
      }
      else {
        response.json(apunte);
      }
    })
  })

  .put(function(request, response, next){
    // Update apunte
    Apunte.findByIdAndUpdate(request.params.id, request.body, {}, function(error, apunte){
      if (error) {
        return next(error);
      }
      if (!apunte) {
        return response.send(404);
      }
      else {
        response.send(200);
      }
    })
  })

  .delete(function(request, response, next){
    // Remove apunte
    Apunte.findByIdAndRemove(request.params.id, function(error, apunte){
      if (error) {
        return next(error);
      }
      if (!apunte) {
        return response.send(404);
      }
      else {
        response.send(200);
      }
    })
  })

module.exports = router;
