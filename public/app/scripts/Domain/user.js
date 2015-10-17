(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'UserStore', user]);

    //Obviously need to actually implement this.
    function user($resource, UserStore) {
        var store;

        function User() { this.id = 1; this.isAuthenticated = false; store = new UserStore(this.id); }

        User.prototype.getRecipes = function() {
            return store.getCurrentUserRecipes();
        };

        User.prototype.getRecipeById = function(recipeId) {
            return store.getRecipeById(recipeId);
        };

        User.prototype.saveRecipe = function(recipe) {
            //User id in recipe is populate in backend based on oauth token.
            return store.saveRecipe(recipe);
        };

        User.prototype.deleteRecipe = function(recipeId) {
            return store.deleteRecipe(recipeId, this.id);
        };

        return new User();
    }
})();