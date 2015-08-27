'use strict';

angular.module('brewApp.directives')
    .directive('brewTable', ['$q', function($q) {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                $q.when(scope.prepareData()).then(function(options) {
                    $(element).DataTable(options);
                });
            }
        };
    }]);