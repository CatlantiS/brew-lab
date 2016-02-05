'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('UserCtrl', ['$scope', 'UserStore', 'Store', 'notifications', UserController]);

    function UserController($scope, UserService, Store, notifications) {
        var User = {};

        UserService.getAllUsers().then(function(data) {
            User.userList = data;
        }, function(err) {
            notifications.error(err.status + ', ' + err.statusText);
        });

        User.Create = function() {
            var UserCreate = $scope.UserCreate;
            if (UserCreate.password != UserCreate.confirmPassword) {
                notifications.error('Passwords do not match');
            }
            else {
                Store.createUser(UserCreate).then(function(data) {
                    notifications.success('Use creation successful ');
                }, function(err) {
                    console.log(err);
                   notifications.error(err.status + ' - ' + err.statusText);
                });
            }
        };

        $scope.User = User;
    }
})();
