var mongoose = require('mongoose');
var User = mongoose.model('User', { 
  name: String,
  phone: String,
  imgCodes: String,
  smsCode: String
});

module.exports = User