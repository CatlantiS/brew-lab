'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http','notifications', LoginController]);

    function LoginController($scope, $http, notifications) {
        $scope.isLogin = true;
        var login = {}
        login.isAuthorized = false;

        login.ProcessLogin = function() {
            
            $http.post('/login', {username: login.username, password: login.password})
                .success(function(data) {
                    notifications.info('Login successful');
                    login.isAuthorized = true;
                })
                .error(function(data,status) {
                    notifications.error('Login failed, ' + status);
                });
        }

        login.Authorize = function() {
            $http.get('/authorization?redirect_uri=%2Fsecure&client_id=1&response_type=token')
            .then(function(data) {
                console.log(data);
            });
        }

        $scope.login = login;
    }
})();