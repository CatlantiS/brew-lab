(function() {
    'use strict';

    angular.module('brewApp.directives').directive('savedRecipesTab', savedRecipesTab);

    function savedRecipesTab() {
        return {
            restrict: 'AE',
            templateUrl: '/views/savedRecipes'
        };
    }
})();