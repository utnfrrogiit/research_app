var Apunte = require('mongoose').model('Apunte');
var fs = require('fs');
var path = require('path');
var router = require('express').Router();

router.route('/apuntes')
  .get(function(request, response, next){
    var mq = request.mongooseQuery;

    Apunte.find(mq.query, mq.fields, mq.options, function(error, apuntes){
      if (!error) {
        response.json(apuntes);
      }
      else {
        next(error);
      }
    });
  })

  .post(function(request, response, next){

    if ( !request.user ) return response.send(401);

    // Save File
    var tempPath = request.files.file.path;
    var newPath = path.join('uploads/apuntes/', request.files.file.name);

    fs.rename(tempPath, newPath, function(error){
      if (error) {
        return next(error);
      }
    });

    // Create apunte
    var apunte = new Apunte(request.body);
    apunte.filePath = newPath;

    // Set owner
    apunte.owner = request.user._id;

    // Save to DB
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
    var mq = request.mongooseQuery;

    // Get apunte
    Apunte.findById(request.params.id, mq.fields, function(error, apunte){
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
