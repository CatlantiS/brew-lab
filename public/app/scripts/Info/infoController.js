'use strict';

angular.module('brewApp.controllers')
    .controller('InfoCtrl', ['$scope', infoController]);

function infoController($scope) {
    $scope.app = {
        version: '%APPVERSION%'
    };
};
