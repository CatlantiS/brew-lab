// complete mockup, will be replaced with data access code later

var clients = [{
    id: 1,
    name: 'test client',
    secret: 'secret',
    //redirectUri: 'http://example.org/oauth2'
    redirectUri: "/secure"
	}, {
    id: 2,
    name: 'test client 2',
    redirectUri: 'http://example.org/oauth2'
	}];

module.exports.fetchById = function(clientId, cb) {
	for (var i in clients) {
		if (clientId == clients[i].id) return cb(null, clients[i]);
	}
	cb();
};

module.exports.getRedirectUri = function(client) {
	console.log('returning redirectUri = ' + client.redirectUri);
	return client.redirectUri;
};