'use strict';

angular.module('brewApp.directives').directive('brewTable', ['$q', brewTable]);

function brewTable($q) {
    return {
        restrict: 'AE',
        link: function(scope, element) {
            $q.when(scope.loadData()).then(function(options) {
                $(element).DataTable(options);
            });
        }
    };
}
