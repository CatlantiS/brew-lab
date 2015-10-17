'use strict';

angular.module('brewApp.directives')
    .directive('brewTable', ['$q', 'Helper', function($q, Helper) {
        return {
            restrict: 'AE',
            scope: {
                data: '=',
                prepareData: '&'
            },
            link: function(scope, element) {
                $q.when(scope.prepareData()).then(function(options) {
                    $(element).DataTable(options);

                    scope.$watch('data', function(updated) {
                        var dataTable = $(element).dataTable();

                        dataTable.fnClearTable();

                        if (angular.isArray(updated) && updated.length > 0) {
                            updated = Helper.deResourcifyArray(updated);

                            dataTable.fnAddData(updated);
                        }
                    });
                });
            }
        };
    }]);