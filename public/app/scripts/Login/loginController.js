'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http','notifications', LoginController]);

    function LoginController($scope, $http, notifications) {
        $scope.isLogin = true;
        var login = {}

        login.ProcessLogin = function() {
            console.log(login);
            /*if (login.username == 'brewuser' && login.password == 'meow') {
                notifications.success('login successful!');
            }
            else
            {
                notifications.error('Bad username and/or password.');
            }*/

            $http.post('/login', {username: login.username, password: login.password})
                .success(function(data) {
                    notifications.info('Login successful');
                })
                .error(function(data,status) {
                    notifications.error('Login failed, ' + status);
                });
        }

        $scope.login = login;
    }
})();