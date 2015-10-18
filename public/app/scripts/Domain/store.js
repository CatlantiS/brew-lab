(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Store', ['$resource', 'Configuration', store]);

    function store($resource, Configuration) {
        var resource = {
            user: $resource(Configuration.store.url.api + 'users/id/:userId'),
            //Do we really need a separate resource for this?
            userRecipes: $resource(Configuration.store.url.api + 'users/:userId/recipes/'),
            recipe: $resource(Configuration.store.url.api + 'recipes/:recipeId')
        };

        function Store() {};

        Store.prototype.getUser = function(userId) {
            return resource.user.get({ userId: userId }).$promise;
        };

        Store.prototype.getUserByUserName = function(userName) {
            return $resource(Configuration.store.url.api + 'users/name/:userName').query({ userName: userName }).$promise;
        };

        Store.prototype.getAllUsers = function() {
            return $resource(Configuration.store.url.api + 'users/all').query().$promise;
        };

        Store.prototype.createUser = function(user) {
            return $resource(Configuration.store.url.api + 'users/create').save(user).$promise;
        };

        Store.prototype.getCurrentUserId = function() {
            return $resource(Configuration.store.url.api + 'users/current').get({}).$promise;
        }

        Store.prototype.saveRecipe = function(recipe) {
            return resource.recipe.save(recipe).$promise;
        };

        Store.prototype.deleteRecipe = function(recipeId) {
            return resource.recipe.delete({ recipeId: recipeId }).$promise;
        };

        Store.prototype.getRecipesByUserId = function(userId) {
            return resource.userRecipes.query({ userId: userId }).$promise;
        };

        Store.prototype.getCurrentUserRecipes = function() {
            return $resource(Configuration.store.url.api + 'currentUser/recipes').query().$promise;
        };

        Store.prototype.getCurrentUserRecipeById = function(recipeId) {
            return $resource(Configuration.store.url.api + 'currentUser/recipes/:recipeId')
                .get({ recipeId: recipeId }).$promise;
        };

        Store.prototype.getRecipeById = function(recipeId) {
            return resource.recipe.get({ recipeId: recipeId }).$promise;
        };

        Store.prototype.getLogs = function() {
            return $resource(Configuration.store.url.api + 'logs/all').query().$promise;
        }

        return new Store();
    }
})();
