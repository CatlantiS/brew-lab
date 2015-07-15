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
        };

        login.Authorize = function() {
            $http.get('/secure')
            .then(function(data) {
                console.log(data);
            });
        };

        login.GetToken = function() {
            var clientId = 1;
            var secret = 'secret';
            var body = JSON.stringify({grant_type: 'password', username: 'brewuser', password: 'meow'});
            var authHeader = 'Basic ' + btoa(clientId + ':' + secret);
            notifications.info(authHeader);
            $http.post('/token', body, { headers: {'Authorization': authHeader } })
                .then(function(data) {
                    console.log(data.data);
                    var accessToken = data.data.access_token;
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                    notifications.success('Got token = ' + accessToken);
                });
        };

        $scope.login = login;
    }
})();