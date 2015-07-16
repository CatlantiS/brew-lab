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

            return $http.post('/login', {username: username, password: password})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(err) {
                    deferred.reject(err);
                })

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

