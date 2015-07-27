var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({ userId: Number, userName: String, password: String, lastName: String, firstName: String, secret: String });
var User = mongoose.model('users', userSchema);
var User = mongoose.model('users');

var All = function(cb) {
    User.find({}, function(err, obj) {
        cb(err, obj);
    })
}

module.exports.All = All;
module.exports.User = User;