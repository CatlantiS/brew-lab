//Todo: make this suck a much smaller carton of rotten eggs.
(function() {
    'use strict';

    angular.module('brewApp.services').factory('Configuration', configuration);

    function configuration() {
        //This can be expanded.
        function Url(base) { this.base = base; return this; }

        //Can make this much cooler.
        Url.prototype.route = function(name, route) { this[name] = this.base + route; return this; };

        var storeUrl = new Url('http://localhost:3000').route('api', '/api/v1/'),
            authUrl = new Url('http://localhost:3000/authorize');

        return {
            store: {
                url: storeUrl
            },
            auth: {
                url: authUrl
            },
            currentUser: {
                cacheRecipes: true
            }
        };
    }
})();