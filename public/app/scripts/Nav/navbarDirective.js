(function() {
    'use strict';

    angular.module('brewApp.directives').directive('navbar', navbar);

    function navbar() {
        return {
            templateUrl: '/views/navbar'
        };
    }
})();
