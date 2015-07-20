var db = require('./db.js');

module.exports.getId = function(user) {
	return user.id;
};

module.exports.fetchById = function(id,cb) {
	db.user.findOne({ userId: id }, function(err, obj) {
		var user = {
			id: obj.userId,
			userName: obj.userName,
			password: obj.password
		}
		return cb(null, user);
	});
};

module.exports.fetchByUsername = function(username, cb) {
	db.User.findOne({ userName: username}, function(err, obj) {
		var user = {
			id: obj.userId,
			userName: obj.userName,
			password: obj.password
		};
		return cb(null, user);
	});
};

module.exports.checkPassword = function(user, password, cb) {
	(user.password == password) ? cb(null, true) : cb(null, false);
};

module.exports.fetchFromRequest = function(req) {
	return req.session.user;
};