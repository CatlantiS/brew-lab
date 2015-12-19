(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','$q', 'Configuration', 'Helper', 'logger', auth]);

    function auth($http, $q, Configuration, Helper, logger) {
        var _isAuthenticated = false,
            authUrl = Configuration.auth.url;

        function authenticate(username, password) {
            var deferred = $q.defer();

            var clientId = 1;
            var secret = 'secret';
            var body = JSON.stringify({grant_type: 'password', username: username, password: password});
            var authHeader = 'Basic ' + btoa(clientId + ':' + secret);

            $http.post(Helper.joinPaths([authUrl.auth, '/authorize']), body, { headers: {'Authorization': authHeader }})
                .success(function(data) {
                    _isAuthenticated = true;

                    var accessToken = data.access_token;

                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

                    logger.setAuthHeader('Bearer ' + accessToken);

                    deferred.resolve(_isAuthenticated);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        function signOut() {
            var deferred = $q.defer();

            return $http.get('/logoff')
                .success(function(res) {
                    _isAuthenticated = false;

                    deferred.resolve(_isAuthenticated);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function secureTest() { return $http.get(Helper.joinPaths([authUrl.auth, '/secure'])); }

        function isAuthenticated() { return _isAuthenticated; }

        return {
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            signOut: signOut
        };
    }
})();

