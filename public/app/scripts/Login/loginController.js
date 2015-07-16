'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http','Auth', 'notifications', LoginController]);

    function LoginController($scope, $http, Auth, notifications) {
        $scope.isLogin = true;
        var login = {}
        login.isAuthorized = false;

        login.ProcessLogin = function() {
           Auth.login(login.username, login.password)
               .then(function(data) {
                   notifications.success('Login successful');
                   notifications.info('received authToken = ' + data);
                   $http.defaults.headers.common['Authorization'] = 'Bearer ' + data;
                   login.isAuthorized = true;
                   login.currentUser = login.username;
               },
               function(err) {
                   notifications.error(err);
                });
        };

        $scope.login = login;
    }
})();