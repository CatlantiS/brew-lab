'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', 'notifications', LoginController]);

    function LoginController($scope, notifications) {
        $scope.isLogin = true;
        var login = {}

        login.ProcessLogin = function() {
            console.log(login);
            if (login.username == 'brewuser' && login.password == 'meow') {
                notifications.success('login successful!');
            }
            else
            {
                notifications.error('Bad username and/or password.');
            }
        }

        $scope.login = login;
    }
})();