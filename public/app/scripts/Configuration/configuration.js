//Todo: make this suck a much smaller carton of rotten eggs.
(function() {
    'use strict';

    angular.module('brewApp.services').service('Configuration', configuration);

    function configuration() {
        //This can be expanded.
        function Url(base) {
            this.base = base;
        }

        var storeUrl = new Url('http://localhost:3000');
        storeUrl.api = storeUrl.base + '/api/v1/';

        var authUrl = new Url('http://localhost:3000/authorize');

        return {
            store: {
                url: storeUrl
            },
            authUrl: authUrl,
            currentUser: {
                cacheRecipes: true
            }
        };
    }
})();