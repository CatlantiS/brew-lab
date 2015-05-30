var express  = require('express'),
	app = express(),                 
	mongoClient = require('mongodb').MongoClient,  
	taskCollection,           
	morgan = require('morgan'),          
	bodyParser = require('body-parser'), 
	methodOverride = require('method-override'),
	path = require('path'); 

mongoClient.connect('mongodb://tlabdata01.cloudapp.net:27017/brewlab', function(error, db) {
	if (error)
		throw error;
	
	recipeCollection = db.collection('recipes');
});

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

app.get('/api/schemas/:schemaName', function(request, response) {
	//Obviously clean this up at some point...
	var recipeSchema = {
		name: {
			default: "",
			type: "string"
		}
	}
	
	response.send(recipeSchema);	
});

app.get('/api/recipes', function(request, response) {
	recipeCollection.find().toArray(function(error, results) {
		if (error)
			response.send(error);
		
		response.json(results);
	});
});

app.post('/api/recipes', function(request, response) {
	var recipe = req.body;
		
	//Does this append an _id property?
	recipeCollection.insert(recipe);

	response.send(recipe._id);
});

app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));          
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

app.listen(8008);

console.log("App listening on port 8008");