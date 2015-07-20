var express  = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	morgan = require('morgan'),          
	bodyParser = require('body-parser'), 
	methodOverride = require('method-override'),
	path = require('path'),
	session = require('express-session'),
	query = require('querystring');

//Todo: move REST API into separate service.
mongoose.connect('mongodb://localhost:27017/brewlab');

var storeSchema = new mongoose.Schema({ type: mongoose.Schema.Types.Mixed }, { strict: false });
var Store = mongoose.model('store', storeSchema);
var logsSchema = new mongoose.Schema({ type: mongoose.Schema.Types.Mixed }, { strict: false });
var Logs = mongoose.model('logs', logsSchema);

var oauth2 = require('./oauth/config.js')();

app.set('oauth2', oauth2);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(session({ secret: 'oauth20-provider-test-server', resave: false, saveUninitialized: false }));
app.use(oauth2.inject());

// oauth2 token endpoint
app.post('/token', oauth2.controller.token);

// authorization endpoint
app.get('/authorization', isAuthorized, oauth2.controller.authorization, function(req, res) {
	// Render our decision page
	// Look into ./test/server for further information
	res.render('authorization', {layout: false});
});
app.post('/authorization', isAuthorized, oauth2.controller.authorization);

// login
app.post('/login', function(req, res, next) {

	// this needs to be fixed, angular is not sending querystring for redirect
	var backUrl = req.query.backUrl ? req.query.backUrl : '/';
	delete(req.query.backUrl);
	backUrl += backUrl.indexOf('?') > -1 ? '&' : '?';
	backUrl += query.stringify(req.query);

	// Already logged in
	if (req.session.authorized) res.redirect("/");

	else if (req.body.username && req.body.password) {
		if (req.body.username == "brewuser" && req.body.password == "meow") {
			req.session.user = "brewuser"
			req.session.authorized = true;
			res.status(200).send('Login successful.');
		}
		else
		{
			res.status(403).send("Invalid login info");
		}
	}
	else
	{
		return res.status(403).send("Username or password invalid");
	}
});

// Some secure method
app.get('/secure', oauth2.middleware.bearer, function(req, res) {
	console.log('Entering /secure');
	if (!req.oauth2.accessToken) return res.status(403).send('Forbidden');
	if (!req.oauth2.accessToken.userId) return res.status(403).send('Forbidden');
	res.send('Hi! Dear user ' + req.oauth2.accessToken.userId + '!');
});

function isAuthorized(req, res, next) {
	if (req.session.authorized) next();
	else {
		console.log('sorry not authorized brah');
		var params = req.query;
		params.backUrl = req.path;
		res.redirect('/login?' + query.stringify(params));
	}
};

//Need to revisit this hackjob at some point.
app.get('/:static', function(request, response) {
	var route = 'index.html';
		
    response.sendFile(route, { root: './public/' });
});

app.get('/views/:static', function(request, response) {
	var static = request.params.static,
	    route;
	
	if (static) {
		if (!path.extname(static))
			route = static + '.html';
	}
	else
		route = 'home.html';

	response.sendFile(route, { root: './public/app/views/' });
});

app.get('/api/v1/store/:id', function(request, response) {
	var id = request.params.id;

	Store.findById(id, function(err, obj) {
		if (err)
			response.send(err);

		response.json(obj);
	});
});

app.get('/api/v1/store/user/:userId', function(request, response) {
	var userId = request.params.userId;

	Store.find({ userId: userId }, function(err, obj) {
		if (err)
			response.send(err);

		response.json(obj);
	});
});

app.post('/api/v1/store/', function(request, response) {
	console.log(request.body);

	Store.create(request.body, function(err, obj) {
		if (err)
			response.send(err);

		response.send({ id: obj._id });
	});
});

app.get('/api/v1/logs/', function(request, response) {
	Logs.find({}, function(err, obj) {
		if (err) {
			response.send(err);
		}

		response.json(obj);
	});
});

app.post('/api/v1/logs/', function(request, response) {
	var logdata = JSON.parse(request.body.data)[0];
	console.log('timestamp = ' + logdata.timestamp);
	Logs.create({logdate: logdata.timestamp, level: logdata.level, url: logdata.url, userid: logdata.userid, message: logdata.message}, function(err, obj) {
		if (err) {
			response.send(err);
		}

		response.send({ id: obj._id });
	})
});

app.delete('/api/v1/logs/:id', function(request, response) {
	console.log('calling delete on id = ' + id);
	var id = request.params.id;
	Logs.remove({ _id: id}, function(err) {
		if (err) {
			console.log('error deleting log id = ' + id);
		}
	});
	response.send('success');
});

app.listen(8008);

console.log("App listening on port 8008");