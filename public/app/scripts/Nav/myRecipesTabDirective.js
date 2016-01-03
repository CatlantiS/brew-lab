(function() {
    'use strict';

    angular.module('brewApp.directives').directive('myRecipesTab', myRecipesTab);

    function myRecipesTab() {
        return {
            restrict: 'AE',
            templateUrl: '/views/myRecipes'
        };
    }
})();