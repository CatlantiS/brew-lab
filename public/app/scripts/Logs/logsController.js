'use strict';

angular.module('brewApp.controllers')
    .controller('LogsCtrl', ['$scope',  'logger', logsController]);

function logsController($scope, logger) {
    console.log('calling logs controller');
    logger.getLogs().then(function(data) {
       $scope.logsList = data;
    });
}