(function() {
    'use strict';

    angular.module('brewApp.directives').directive('recipeCard', ['UI', recipeCard]);

    function recipeCard(UI) {
        function link(scope, element) {
            var recipeId = scope.recipe.id,
                editElement = angular.element(element[0].querySelector('.recipe-edit')),
                deleteElement = angular.element(element[0].querySelector('.recipe-delete'));;

            //Add edit icon if callback exists.
            UI.insertEditIcon(editElement, recipeId, scope.recipeEdit);

            //Add delete icon if callback exists.
            UI.insertDeleteIcon(deleteElement, recipeId, scope.recipeDelete);
        }

        return {
            restrict: 'AE',
            scope: {
                recipe: '=',
                recipeEdit: '=',
                recipeDelete: '='
            },
            templateUrl: '/views/recipeCard',
            link: link
        };
    }
})();