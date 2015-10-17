(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'UserStore', user]);

    //Obviously need to actually implement this.
    function user($resource, UserStore) {
        var id = '1',
             isAuthenticated = false,
            store = new UserStore(id);

        function getRecipes() {
            return store.getCurrentUserRecipes();
        }

        function getRecipeById(recipeId) {
            return store.getRecipeById(recipeId);
        }

        function saveRecipe(recipe) {
            recipe.userId = recipe.userId || this.id;

            return store.saveRecipe(recipe);
        }

        function deleteRecipe(recipeId) {
            return store.deleteRecipe(recipeId, id);
        }

        return {
            id: id,
            isAuthenticated: isAuthenticated,
            getRecipes: getRecipes,
            getRecipeById: getRecipeById,
            saveRecipe: saveRecipe,
            deleteRecipe: deleteRecipe
        };
    }
})();