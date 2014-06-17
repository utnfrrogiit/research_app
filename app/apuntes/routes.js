var Apunte = require('mongoose').model('Apunte');
var Categoria = require('mongoose').model('Categoria');
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

router.route('/categorias')

  .get(function(request, response, next){
    // Por ahora sólo devuelve las top level.
    var mq = request.mongooseQuery;
    Categoria.find(mq.query, mq.fields, mq.options, function(error, categorias){
      if (!error) {
        response.json(categorias);
      }
      else {
        next(error);
      }
    })
  })

  .post(function(request, response, next){
    if( !request.user ) return response.send(401);

    var categoria = new Categoria(request.body);
    categoria.save(function(error, categoria){
      if (error) {
        return next(error);
      }
      else {
        response.json({id: categoria.id})
      }
    })
  })

router.route('/categorias/:id')

  .get(function(request, response, next){
    Categoria.findById(request.params.id, "-parent", {lean: true}, function(error, categoria){
      if (error) {
        next(error);
      }
      if (!categoria) {
        return response.send(404);
      }
      else {
        Categoria.find({parent: request.params.id}, "-parent", {lean: true}, function(eror, childs){
          if (!error){
            categoria.childs = childs;
            console.log(childs);
            response.json(categoria);
          }
          else {
            next(error);
          }
        })
      }
    })
  })

  .put(function(request, response, next){
    if( !request.user ) return response.send(401);

    Categoria.findByIdAndUpdate(request.params.id, request.body, null, function(error, categoria){
      if (error) {
        return next(error);
      }
      if (!categoria) {
        response.send(404);
      }
      else {
        response.send(200);
      }
    })
  })

  .delete(function(request, response, next){
    if( !request.user ) return response.send(401);

    Categoria.findByIdAndRemove(request.params.id, function(error, categoria){
      if (error) {
        return next(error);
      }
      if (!categoria) {
        response.send(404);
      }
      else {
        response.send(200);
      }
    })
  });

module.exports = router;
