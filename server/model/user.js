var mongoose = require('mongoose');
var User = mongoose.model('User', { 
  name: String,
  phone: String,
  imgCodes: String,
  smsCode: String,
  pdId: Array
});

module.exports = User