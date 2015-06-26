'use strict';

angular.module('brewApp.controllers')
    .controller('LogsCtrl', ['$scope',  'logger', 'notifications', logsController]);

function logsController($scope, logger, notifications) {
    console.log('calling logs controller');

    var self = this;
    var logs = {};

    self.dataTableOptions = {
        data: null,
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
    };

    logs.testFunc = function() {
        alert('got delete');
    }

    self.getDataForDataTable = function() {
        var arr = self.logs;
        var res = [];
        var i;
        for (i=0; i < arr.length; i++) {
            res.push([arr[i]._id, logs.convertUTC(arr[i].logdate),arr[i].level,arr[i].url,arr[i].userid,arr[i].message]);
        }

        return res;
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