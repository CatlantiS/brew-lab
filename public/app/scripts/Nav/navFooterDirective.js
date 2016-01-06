(function() {
    'use strict';

    angular.module('brewApp.directives').directive('navFooter', navFooter);

    function navFooter() {
        return {
            templateUrl: '/views/navFooter'
        };
    }
})();
