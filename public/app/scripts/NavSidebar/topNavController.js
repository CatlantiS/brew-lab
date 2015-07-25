'use strict';

(function() {
    var changed = false;
    angular.module('brewApp.controllers')
        .controller('topNavController', ['$scope', 'Auth', topNavController]);

    function topNavController($scope, Auth) {
        $scope.Auth = Auth;

        $scope.$watch('Auth.isAuthenticated', function(val) {
            $scope.isAuthenticated = val;
        });;
    }
})();