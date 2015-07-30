var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({ userName: String, password: String, lastName: String, firstName: String, secret: String });
var User = mongoose.model('users', userSchema);

var All = function(cb) {
    User.find({}, function(err, obj) {
        cb(err, obj);
    })
};

var Create = function(userObj, cb) {
    User.create(userObj, function(err, obj) {
        cb(err,obj);
    })
};

module.exports.All = All;
module.exports.User = User;
module.exports.Create = Create;