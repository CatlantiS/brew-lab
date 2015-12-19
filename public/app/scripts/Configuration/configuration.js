(function() {
    'use strict';

    angular.module('brewApp.services').factory('Configuration', ['Helper', configuration]);

    function configuration(Helper) {
        //This can be expanded.
        function Url(base) { this.base = base; }

        Url.prototype.route = function(name, route) { this[name] = Helper.joinPaths(this.base, route); return this; };

        var baseUrl = new Url('http://localhost:3000'),
            storeUrl = baseUrl.route('api', '/api/v1/'),
            authUrl = baseUrl.route('auth', '/auth/v1/');

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