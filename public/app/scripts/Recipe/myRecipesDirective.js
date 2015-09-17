(function() {
    'use strict';

    angular.module('brewApp.directives')
        .directive('myRecipes', myRecipes);

    function myRecipes() {
        function link(s, e, a, ctrl) {
            var table = $("#myRecipesTable");

            table.on('click','.row-edit', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.editRecipe(recipeId);
            });

            table.on('click','.row-delete', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.deleteRecipe(recipeId);
            });
        }

        return {
            restrict: 'A',
            controller: 'MyRecipesCtrl',
            controllerAs: 'ctrl',
            link: link
        };
    }
})();
