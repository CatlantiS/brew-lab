'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'notifications', 'Store', 'User', 'logger', LoginController]);

    function LoginController($scope, $http, $location, Auth, notifications, Store, User, logger) {
        $scope.isLogin = true;
        var login = {}
        login.isAuthorized = false;

        login.ProcessLogin = function() {
           Auth.login(login.username, login.password)
               .then(function(data) {
                   notifications.success('Login successful');
                   notifications.info('received authToken = ' + data);
                   $http.defaults.headers.common['Authorization'] = 'Bearer ' + data;
                   logger.setAuthHeader('Bearer ' + data);
                   login.isAuthorized = true;
                   login.currentUser = login.username;
                   $scope.isAuthenticated = true;
                   Auth.isAuthenticated = true;

                   $location.path('/');
               },
               function(err) {
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