(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Store', ['$resource', 'Configuration', 'Helper', store]);

    function store($resource, Configuration, Helper) {
        var resource = {
            user: $resource(Helper.joinPaths(Configuration.store.url.api, 'users/id/:userId')),
            //Do we really need a separate resource for this?
            userRecipes: $resource(Helper.joinPaths(Configuration.store.url.api, 'users/:userId/recipes/')),
            recipe: $resource(Helper.joinPaths(Configuration.store.url.api, 'recipes/:recipeId'), null, {
                'update': { method:'PUT' }
            }),
            recipeIngredients: $resource(Helper.joinPaths(Configuration.store.url.api, 'recipeIngredients/:recipeId')),
            definition: $resource(Helper.joinPaths(Configuration.store.url.api, 'definitions/:definition')),
            brewMaster:  $resource(Helper.joinPaths(Configuration.store.url.api, 'brewMaster/definitions/'))
        };

        function Store() {}

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

        Store.prototype.getCurrentUser = function() {
            return $resource(Configuration.store.url.api + 'users/current').get({}).$promise;
        }

        Store.prototype.saveRecipe = function(recipe) {
            return resource.recipe.save(recipe).$promise;
        };

        Store.prototype.updateRecipe = function(recipe) {
            return resource.recipe.update({ recipeId: recipe.recipeId }, recipe).$promise;
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

        Store.prototype.getRecipeIngredientsByRecipeId = function(recipeId) {
            return resource.recipeIngredients.query({ recipeId: recipeId }).$promise;
        }

        Store.prototype.getDefinitions = function(definition) {
            return resource.definition.query({ definition: definition }).$promise;
        };

        Store.prototype.getBrewMasterDefinitions = function() {
            return resource.brewMaster.get().$promise;
        };

        Store.prototype.getLogs = function() {
            return $resource(Configuration.store.url.api + 'logs/all').query().$promise;
        };

        return Store;
    }
})();
