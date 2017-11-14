var mongoose = require('mongoose');
var User = mongoose.model('User', { name: String });

module.exports = User