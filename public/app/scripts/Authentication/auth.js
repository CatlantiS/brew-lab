(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','$q', 'User', auth]);

    //Obviously need to actually implement this.
    function auth($http, $q, User) {
        function getCurrentUser() {
            return User.id;
        }

        function isAuthenticated() {
            return true;
        }

        function isInRole(role) {
            return true;
        }

        var login = function(username, password) {
            var deferred = $q.defer();

            $http.post('/login', {username: username, password: password})
                .success(function(data) {
                    var clientId = 1;
                    var secret = 'secret';
                    var body = JSON.stringify({grant_type: 'password', username: 'brewuser', password: 'meow'});
                    var authHeader = 'Basic ' + btoa(clientId + ':' + secret);

                    $http.post('/token', body, { headers: {'Authorization': authHeader } })
                        .then(function(data) {
                            var accessToken = data.data.access_token;
                            deferred.resolve(accessToken);
                        });
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        return {
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole,
            login: login
        };
    }
})();

