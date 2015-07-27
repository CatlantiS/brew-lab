'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('UserCtrl', ['$scope', 'User', 'notifications', UserController]);

    function UserController($scope, UserService, notifications) {
        var User = {};

        console.dir(UserService);
        UserService.All().then(function(data) {
            User.userList = data;
        }, function(err) {
            notifications.error(err.status + ', ' + err.statusText);
        });

        $scope.User = User;
    }
})();
