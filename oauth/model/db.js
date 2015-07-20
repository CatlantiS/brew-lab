var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({ userId: Number, userName: String, password: String, secret: String });
var User = mongoose.model('users', userSchema);

module.exports.User = User;
