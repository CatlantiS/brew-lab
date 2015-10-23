(function() {
    'use strict';

    angular.module('brewApp.directives').directive('recipeCard', ['Helper', recipeCard]);

    function recipeCard(Helper) {
        function link(scope, element) {
            var recipeId = scope.recipe.id;

            //This looks messy.  Must be a cleaner way to do this.
            //Add edit icon if callback exists.
            if (typeof scope.recipeEdit === 'function') {
                var edit = angular.element(element[0].querySelector('.recipe-edit'));
                edit.append(Helper.getEditIconHtml(recipeId));

                edit.on('click', '.edit-icon', function() { scope.recipeEdit(recipeId); });
            }

            //Add delete icon if callback exists.
            if (typeof scope.recipeDelete === 'function') {
                var del = angular.element(element[0].querySelector('.recipe-delete'));
                del.append(Helper.getDeleteIconHtml(recipeId));

                del.on('click', '.delete-icon', function() { scope.recipeDelete(recipeId); });
            }
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