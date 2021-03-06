var express  = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'), 
	methodOverride = require('method-override'),
	path = require('path'),
	session = require('express-session'),
	query = require('querystring');

//Todo: move REST API into separate service.

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(session({ secret: 'oauth20-provider-test-server', resave: false, saveUninitialized: false }));

//Need to revisit this hackjob at some point.
app.get('/:static', function(request, response) {
	var route = 'index.html';
		
    response.sendFile(route, { root: './public/' });
});

app.get('/views/:static', function(request, response) {
	var static = request.params.static,
	    route;
	
	if (static) {
		route = static;

		if (!path.extname(static))
			route += '.html';
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
