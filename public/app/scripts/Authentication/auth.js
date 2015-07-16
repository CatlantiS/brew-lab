(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['$http','User', auth]);

    //Obviously need to actually implement this.
    function auth($http, User) {
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
            return $http.post('/login', {username: username, password: password});
        };

        return {
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole,
            login: login
        };
    }
})();

