'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http', '$location', '$window', 'Auth', 'notifications', 'logger', LoginController]);

    function LoginController($scope, $http, $location, $window, Auth, notifications, logger) {
        var login = { auth: Auth };

        login.logIn = function() {
           Auth.authenticate(login.username, login.password)
               .then(null, function(err) {
                   notifications.error(err.error_description);
               });
        };

        login.logOut = function() {
            Auth.signOut().then(function() {
                $window.location.href = '/';
            }, function(err) { notifications.error(err); });
        };

        $scope.login = login;
    }
})();