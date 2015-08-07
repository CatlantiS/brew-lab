(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','$q', 'User', 'Configuration', auth]);

    //Obviously need to actually implement this.
    function auth($http, $q, User, Configuration) {
        var isAuthenticated = false;

        function getCurrentUser() {
            return User.id;
        }
        
        function isInRole(role) {
            return true;
        }

        var login = function(username, password) {
            var deferred = $q.defer();

            var url = Configuration.authUrl;   

            console.log('hitting url = ');
            console.dir(url);

            var clientId = 1;
            var secret = 'secret';
            var body = JSON.stringify({grant_type: 'password', username: username, password: password});
            var authHeader = 'Basic ' + btoa(clientId + ':' + secret);

            $http.post(url.base, body, { headers: {'Authorization': authHeader }})
                .success(function(data) {
                    var accessToken = data.data.access_token;
                    User.isAuthenticated = true;
                    deferred.resolve(accessToken);
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

