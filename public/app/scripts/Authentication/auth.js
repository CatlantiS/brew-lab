(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Auth', ['User', auth]);

    //Obviously need to actually implement this.
    function auth() {
        function getCurrentUser() {
            return User.id;
        }

        function isAuthenticated() {
            return true;
        }

        function isInRole(role) {
            return true;
        }

        return {
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole
        };
    }
})();

