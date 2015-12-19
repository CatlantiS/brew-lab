'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', 'Auth', 'notifications', LoginController]);

    function LoginController($scope, Auth, notifications) {
        var self = this;

        self.logIn = function() {
            if (!(self.username || self.password))
                notifications.error('Must provide username and password to log in.');

            Auth.authenticate(self.username, self.password)
               .then(null, function(err) {
                   notifications.error(err.error_description);
               });
        };

        self.logOut = function() {
            Auth.signOut().then(null, function(err) {
                notifications.error(err);
            });
        };
    }
})();