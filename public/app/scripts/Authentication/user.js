(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'ThriftStore', user]);

    //Obviously need to actually implement this.
    function user($resource, ThriftStore) {
        var id = '1',
            isAuthenticated = false,
            thriftStore = new ThriftStore(id);

        function getRecipes() {
            return thriftStore.getRecipesByUserId(id);
        }

        function saveRecipe(recipe) {
            recipe.userId = recipe.userId || id;

            return thriftStore.saveRecipe(recipe);
        }

        return {
            id: id,
            isAuthenticated: isAuthenticated,
            getRecipes: getRecipes,
            saveRecipe: saveRecipe
        };
    }
})();