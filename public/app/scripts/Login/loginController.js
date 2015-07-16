'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http','Auth', 'notifications', LoginController]);

    function LoginController($scope, $http, Auth, notifications) {
        $scope.isLogin = true;
        var login = {}
        login.isAuthorized = false;

        login.ProcessLogin = function() {
            //console.log(Auth);
           Auth.login(login.username, login.password)
               .then(function(data) {
                  notifications.success('Login successful');
                   login.isAuthorized = true;
               },
               function(err) {
                   notifications.error(err.status + ', ' + err.data);
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