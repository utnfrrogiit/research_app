mongoose = require('mongoose');

Apunte = mongoose.model('Apunte');

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
