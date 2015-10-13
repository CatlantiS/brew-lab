'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http', '$location', '$window', 'Auth', 'notifications', 'Store', 'User', 'logger', LoginController]);

    function LoginController($scope, $http, $location, $window, Auth, notifications, Store, User, logger) {
        $scope.isLogin = true;

        var login = {
            auth: Auth
        };

        login.logIn = function() {
           Auth.login(login.username, login.password)
               .then(function(data) {
                   //notifications.success('Login successful');
                   //notifications.info('received authToken = ' + data);
                   $http.defaults.headers.common['Authorization'] = 'Bearer ' + data;
                   logger.setAuthHeader('Bearer ' + data);
                   login.currentUser = login.username;
                   Auth.isAuthenticated = true;

                   $location.path('/');
               },
               function(err) {
                   notifications.error(err.error_description);
                });
        };

        login.logOut = function() {
            $http.get('/logoff')
                .success(function(res) {
                    Auth.isAuthenticated = false;

                    $window.location.href = '/';
                })
                .error(function(err) {
                    notifications.error(err);
                });
        };

        login.secureTest = function() {
            $http.get('/secure')
                .success(function(data) {
                    notifications.success(data);
                    login.testOutput = data;
                })
                .error(function(error) {
                    notifications.error(error.error);
                    login.testOutput = error.error + ', ' + error.error_description;
                });
        };

        $scope.login = login;
    }
})();