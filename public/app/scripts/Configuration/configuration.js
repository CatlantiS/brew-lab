(function() {
    'use strict';

    angular.module('brewApp.services').factory('Configuration', ['Helper', configuration]);

    function configuration(Helper) {
        var baseUrl = new Helper.Url('http://blabdatadev01.cloudapp.net:3000'),
            storeUrl = baseUrl.route('api', '/api/v1/'),
            authUrl = baseUrl.route('auth', '/auth/v1/'),
            loggingUrl = baseUrl.route('logging', '/logging/v1/');

        return {
            store: {
                url: storeUrl
            },
            auth: {
                url: authUrl
            },
            logging: {
                url: loggingUrl
            },
            currentUser: {
                cacheRecipes: true
            }
        };
    }
})();