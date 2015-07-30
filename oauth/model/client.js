var db = require('./db.js');

module.exports.fetchById = function(clientId, cb) {
	db.Client.findOne( { clientId: clientId }, function(err, obj) {
		var client = {
			clientId: obj.clientId,
			name: obj.name,
			secret: obj.secret,
			redirectUri: obj.redirectUri
		}
		return cb(null, client);
	});
};

module.exports.getRedirectUri = function(client) {
	console.log('returning redirectUri = ' + client.redirectUri);
	return client.redirectUri;
};

module.exports.getId = function(client) {
	return client.id;
};

module.exports.checkSecret = function(client, secret, cb) {
	return cb(null, client.secret == secret);
};
