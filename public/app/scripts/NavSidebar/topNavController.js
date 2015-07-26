'use strict';

(function() {
    var changed = false;
    angular.module('brewApp.controllers')
        .controller('topNavController', ['$scope', '$http', '$window', 'Auth', 'notifications', topNavController]);

    function topNavController($scope, $http, $window, Auth, notifications) {
        $scope.Auth = Auth;

        $scope.$watch('Auth.isAuthenticated', function(val) {
            $scope.isAuthenticated = val;
        });

        $scope.Logoff = function() {
            $http.get('/logoff')
                .success(function(res) {
                   notifications.success(res);
                    $scope.isAuthenticated = false;
                    $window.location.href = '/login';

                })
                .error(function(err) {
                   notifications.error(err);
                });
        }
    }
})();