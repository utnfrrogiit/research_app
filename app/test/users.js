var request = require('supertest');
var mongoose = require('mongoose');
var should = require('should');
var app = require('../../server');
var config = require('../config/config');
var agent = request(app);

describe('Users module', function(){

  before(function(done){
    mongoose.connection.on('connected', done);
    mongoose.connect(config.db);
  })

  after(function(done){
    mongoose.connection.on('disconnected', done);
    mongoose.connection.close();
  })

  describe('asdawd', function(){
    it('awdawd');
  })
})
