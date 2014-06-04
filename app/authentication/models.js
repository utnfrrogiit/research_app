var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    },
    password: {type: String, required: true},
    userType: String,
    tokens: [
      {
        token: String,
        lastUsed: Date
      }
    ]
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

userSchema.statics.findByToken = function(token, cb){
  this.findOne({'tokens.token': token}, cb);
}

userSchema.methods.generateHash = function(str){
  return bcrypt.hashSync(str, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateTokenAndSave = function(cb){
  var token = this.generateHash(this.id + Date.now() + 'secret');
  this.tokens.push({token: token, lastUsed: Date.now()});
  this.save(function(error){
    if (!error){
      cb(null, token);
    }
    else {
      cb(error, false);
    }
  });
}

mongoose.model("User", userSchema);
