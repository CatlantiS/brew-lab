'use strict';

angular.module('brewApp.controllers')
    .controller('LogsCtrl', ['$scope',  'logger', 'notifications', logsController]);

function logsController($scope, logger, notifications) {
    console.log('calling logs controller');

    var refreshLogsModel = function() {
        logger.getLogs().then(function(data) {
            $scope.logsList = data;
        });
    }

    refreshLogsModel();

    $scope.deleteLog = function(id) {
        if (confirm('Are you sure you wish to delete id = ' + id + '?')) {
            logger.deleteLog(id).then(function(data) {
                notifications.info('Log entry deleted');
                refreshLogsModel();
            }, function(err) {
                console.log(err);
                notifications.error('Error deleting');
            });
        }
    }
}