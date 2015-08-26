(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'ThriftStore', user]);

    //Obviously need to actually implement this.
    function user($resource, ThriftStore) {
        var id = '1',
             isAuthenticated = false,
            store = new ThriftStore(id);

        function getRecipes() {
            return store.getRecipesByUserId(id);
        }

        function saveRecipe(recipe) {
            recipe.userId = recipe.userId || this.id;

            return store.saveRecipe(recipe);
        }

        return {
            id: id,
            isAuthenticated: isAuthenticated,
            getRecipes: getRecipes,
            saveRecipe: saveRecipe
        };
    }
})();