(function() {
    'use strict';

    angular.module('brewApp.directives').directive('newRecipeTab', newRecipeTab);

    function newRecipeTab() {
        return {
            restrict: 'AE',
            templateUrl: '/views/addRecipe'
        };
    }
})();
