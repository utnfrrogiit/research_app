var mongoose = require('mongoose');
var config = require('./config');

module.exports.connect = function (url) {
  mongoose.connect(url);

  mongoose.connection.on('error', console.error.bind(console, "Connection error"));

  mongoose.connection.on('connected', function(){
    console.log('Connection opened for ' + config.runningEnvironment + '.');
  });

  mongoose.connection.on('disconnected', function(){
    console.log('Connection closed for ' + config.runningEnvironment + '.')
  })
}
