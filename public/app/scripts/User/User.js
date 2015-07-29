'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('UserCtrl', ['$scope', 'User', 'notifications', UserController]);

    function UserController($scope, UserService, notifications) {
        var User = {};

        UserService.All().then(function(data) {
            User.userList = data;
        }, function(err) {
            notifications.error(err.status + ', ' + err.statusText);
        });

        User.Create = function() {
            var UserCreate = $scope.UserCreate;
            console.dir(UserCreate);
            if (UserCreate.Password != UserCreate.ConfirmPassword) {
                notifications.error('Passwords do not match');
            }
            else {
                UserService.Create(UserCreate); // TODO:  implement this in service
            }
        };

        $scope.User = User;
    }
})();
