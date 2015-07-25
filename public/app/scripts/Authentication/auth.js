(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','$q', 'User', auth]);

    //Obviously need to actually implement this.
    function auth($http, $q, User) {
        var isAuthenticated = false;

        function getCurrentUser() {
            return User.id;
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
                    var body = JSON.stringify({grant_type: 'password', username: username, password: password});
                    var authHeader = 'Basic ' + btoa(clientId + ':' + secret);

                    $http.post('/token', body, { headers: {'Authorization': authHeader } })
                        .then(function(data) {
                            var accessToken = data.data.access_token;
                            User.isAuthenticated = true;
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

