'use strict';

angular.module('app.controllers')
    .controller('InfoCtrl', ['$scope', infoController]);

function infoController($scope) {
    $scope.app = {
        version: '%APPVERSION%'
    };
};
