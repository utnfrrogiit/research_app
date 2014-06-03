var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userType: String,
    tokens: [String]
});


userSchema.statics.findByToken = function(token, cb){
  this.findOne({tokens: token}, cb);
}

userSchema.methods.generateHash = function(str){
  return bcrypt.hashSync(str, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateTokenAndSave = function(cb){
  var token = this.generateHash(this.id + Date.now() + 'secret');
  this.tokens.push(token);
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
