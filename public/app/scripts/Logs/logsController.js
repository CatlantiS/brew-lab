'use strict';

angular.module('brewApp.controllers')
    .controller('LogsCtrl', ['$scope',  'logger', 'notifications', logsController]);

function logsController($scope, logger, notifications) {
    var self = this;
    var logs = {};

    logs.testFunc = function() {
        alert('got delete');
    }

    $scope.loadData = function() {
        return logger.getLogs().then(function(data) {

            return options = {
                data: data.map(function(i) {
                   return [i._id, convertUTC(i.logdate), i.level, i.url, i.userid, i.message];
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

    var convertUTC = function(d) {
        var dateString = (new Date(d)).toString();
        return dateString;
    };

    self.logs = logs;
}