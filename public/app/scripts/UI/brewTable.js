'use strict';

angular.module('brewApp.directives')
    .directive('brewTable', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                $(element).DataTable(scope.dataTableOptions);
            }
        };
    });
