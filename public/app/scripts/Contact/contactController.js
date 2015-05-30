'use strict';

angular.module('app.controllers')
    .controller('ContactCtrl', ['$scope', contactController]);

function contactController($scope) {
    $scope.contact = {};

    $scope.submit = function(contact) {
        $scope.contactForm.$setPristine();
        $scope.contact = {};

        $scope.result = 'Your message went into a blackhole.';
    };

    $scope.clear = function() {
        $scope.contactForm.$setPristine();
        $scope.contact = {};
        $scope.result = '';
    };
};
