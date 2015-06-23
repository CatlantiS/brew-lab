var express  = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	morgan = require('morgan'),          
	bodyParser = require('body-parser'), 
	methodOverride = require('method-override'),
	path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

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

//Todo: move REST API into separate service.
mongoose.connect('mongodb://localhost:27017/brewlab');

var storeSchema = new mongoose.Schema({ type: mongoose.Schema.Types.Mixed }, { strict: false });
var Store = mongoose.model('store', storeSchema);
var logsSchema = new mongoose.Schema({ type: mongoose.Schema.Types.Mixed }, { strict: false });
var Logs = mongoose.model('logs', logsSchema);

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

	Store.find({ user: userId }, function(err, obj) {
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
	Logs.create(request.body, function(err, obj) {
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