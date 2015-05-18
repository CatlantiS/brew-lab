'use strict';

//Flesh this loser out.  
app.service('schema', function($http, $q) {
	var cache = {};
	
	this.get = function(options) {
		var deferred = $q.defer();
		
		if (options.schemaName == null)
			//Is this how we want to handle this?
			deferred.reject('Schema name is required.');
		else
			$http.get('/api/schemas/' + options.schemaName)
				.success(function(data, status, headers, config) {
					if (options.cache)
						cache[options.schemaName] = data;
				
					deferred.resolve(data);
				})
				//Is this right?
				.error(function(data, status, headers, config) {
					deferred.reject('Request failed.');
				});
		
		return deferred.promise;
	};
	
	this.store = function(schema) {
		var deferred = $q.defer();
		
		$http.post('api/schemas/', schema)
			.success(function(data, status, headers, config) {
		    	deferred.resolve({ id: data });
		  	})
		  	.error(function(data, status, headers, config) {
				deferred.reject('Request failed.');
		  	});
			
		return deferred.promise;
	};
});