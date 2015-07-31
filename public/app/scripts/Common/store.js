//Should move this out of Common at some point.
(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Store', ['$resource', 'Configuration', store]);

    function store($resource, Configuration) {
        var User = $resource(Configuration.storeUrl.api + 'users/:userId'),
            //Do we really need a separate resource for this?
            UserRecipes = $resource(Configuration.storeUrl.api + 'users/:userId/recipes/'),
            Recipe = $resource(Configuration.storeUrl.api + 'recipes/:recipeId');

        function getUser(userId) {
            return User.get({ userId: userId }).$promise;
        }

        function saveRecipe(recipe) {
            return Recipe.save(recipe).$promise;
        }

        function getRecipesByUserId(userId) {
            return UserRecipes.query({ userId: userId }).$promise;
        }

        function getRecipeById(recipeId) {
            return Recipe.get({ recipeId: recipeId }).$promise;
        }

        return {
            getUser: getUser,
            saveRecipe: saveRecipe,
            getRecipesByUserId: getRecipesByUserId,
            getRecipeById: getRecipeById
        };
    }
})();
