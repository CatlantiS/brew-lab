(function() {
    'use strict';

    angular.module('brewApp.directives').directive('discoverTab', discoverTab);

    function discoverTab() {
        return {
            restrict: 'AE',
            templateUrl: '/views/discover'
        };
    }
})();
