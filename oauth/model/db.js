var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({ type: mongoose.Schema.Types.Mixed }, { strict: false });
var User = mongoose.model('users', userSchema);

module.exports.User = User;
