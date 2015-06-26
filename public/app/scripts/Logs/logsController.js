'use strict';

angular.module('brewApp.controllers')
    .controller('LogsCtrl', ['$scope',  'logger', 'notifications', logsController]);

function logsController($scope, logger, notifications) {
    console.log('calling logs controller');

    var self = this;
    var logs = {};

    logs.testFunc = function() {
        alert('got delete');
    }

    $scope.loadData = function() {
        return logger.getLogs().then(function(data) {
            self.isLoading = false;

            return options = {
                data: data.map(function(i) {
                   return [i._id, i.logdate, i.level, i.url, i.userid, i.message];
                }),
                columns: [
                    { title: 'Id' },
                    { title: 'Date/Time' },
                    { title: 'Level' },
                    { title: 'URL' },
                    { title: 'User' },
                    { title: 'Message' },
                    {
                        data: null,
                        defaultContent: '<a href="#" class="editor_remove" ng-click="logs.testFunc()">Delete</a>'
                    }
                    ]
            }
        });
    };

    var refreshLogsModel = function() {
        logger.getLogs().then(function(data) {
            logs.logsList = data;
        });
    };

    refreshLogsModel();

    logs.deleteLog = function(id) {
        if (confirm('Are you sure you wish to delete id = ' + id + '?')) {
            logger.deleteLog(id).then(function(data) {
                notifications.info('Log entry deleted');
                refreshLogsModel();
            }, function(err) {
                console.log(err);
                notifications.error('Error deleting');
            });
        }
    };

    logs.convertUTC = function(d) {
        var dateString = (new Date(d)).toString();
        return dateString;
    };

    $scope.sortReverse = false;
    $scope.logs = logs;

    self.isLoading = true;

    logger.getLogs().then(function(data) {
        self.logs = data;
        self.isLoading = false;
    });
}