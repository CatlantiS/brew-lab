'use strict';

angular.module('brewApp.directives')
    .directive('brewTable', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                scope.loadData().then(function(options) {
                    $(element).DataTable(options);
                });

            
            }
        };
    });
