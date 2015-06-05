'use strict';

angular.module('app.controllers')
    .controller('ContactCtrl', ['$scope', 'AppState', contactController]);

function contactController($scope, AppState) {
    $scope.contact = AppState.area('Contact').contact || {};

    $scope.submit = function(contact) {
        $scope.contactForm.$setPristine();
        $scope.contact = {};
        AppState.area('Contact').destroy('contact');

        $scope.result = 'Your message went into a blackhole.';
    };

    $scope.clear = function() {
        $scope.contactForm.$setPristine();
        $scope.contact = {};
        AppState.area('Contact').destroy('contact');

        $scope.result = '';
    };

    //Why is this getting called twice?
    $scope.$on('$destroy', function() {
        if ($scope.contactForm && $scope.contactForm.$dirty)
            AppState.area('Contact').contact = $scope.contact;
    });
};
