'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', 'Auth', 'notifications', LoginController]);

    function LoginController($scope, Auth, notifications) {
        var login = { auth: Auth };

        login.logIn = function() {
           Auth.authenticate(login.username, login.password)
               .then(null, function(err) {
                   notifications.error(err.error_description);
               });
        };

        login.logOut = function() {
            Auth.signOut().then(null, function(err) {
                notifications.error(err);
            });
        };

        $scope.login = login;
    }
})();