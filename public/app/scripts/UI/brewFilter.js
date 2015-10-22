(function() {
    'use strict';

    angular.module('brewApp.directives').directive('brewFilter', brewFilter);

    function brewFilter() {
        return {
            restrict: 'AE',
            scope: {
                search: '=',
                sortByDictionary: '=',
                sortBy: '='
            },
            templateUrl: '/views/filterBar'
        };
    }
})();