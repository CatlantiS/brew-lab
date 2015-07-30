var db = require('./db.js');

module.exports.getId = function(user) {
	return user.id;
};

module.exports.fetchById = function(id,cb) {
	console.log('calling fetchById');
	db.user.findOne({ _id : id }, function(err, obj) {
		var user = {
			id: obj._id,
			userName: obj.userName,
			firstName: obj.firstName,
			lastName: obj.lastName,
			password: obj.password
		};
		return cb(null, user);
	});
};

module.exports.fetchByUsername = function(username, cb) {
	db.User.findOne({ userName: username}, function(err, obj) {
		if (err) {
			console.log('we have an error in fetchbyusername');
		}
		if (obj) {
			var user = {
				id: obj._id,
				userName: obj.userName,
				firstName: obj.firstName,
				lastName: obj.lastName,
				password: obj.password
			};
			return cb(null, user);
		}
		else {
			console.log('no user');
			cb();
		}
	});
};

module.exports.checkPassword = function(user, password, cb) {
	if (user) {
		(user.password == password) ? cb(null, true) : cb(null, false);
	}
	else {
		cb(null, false);
	}
};

module.exports.fetchFromRequest = function(req) {
	return req.session.user;
};