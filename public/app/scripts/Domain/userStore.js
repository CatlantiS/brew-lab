(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('UserStore', ['$q', 'Configuration', 'ClassFactory', 'ObjectMapper', 'Store', userStore]);

    function userStore($q, Configuration, ClassFactory, ObjectMapper, Store) {
        function UserStore(userId) {
            this.userId = userId;
            this.cache = Configuration.currentUser.cacheRecipes ? initCache(userId) : null;
        };

        //Not true prototype inheritance.
        UserStore.prototype = Object.create(Store);

        UserStore.prototype.saveRecipe = function(recipe) {
            var self = this,
                deferred = $q.defer();

            Store.saveRecipe(recipe).then(function(data) {
                //Mark recipe as added and cache.
                if (isCacheUser.call(self, recipe.userId)) {
                    recipe.added = true;

                    self.cache.recipes.add(data.id, recipe);
                }

                recipe.id = data.id;

                deferred.resolve(data);
            });

            return deferred.promise;
        };

        UserStore.prototype.deleteRecipe = function(recipeId, userId) {
            recipeId = Number(recipeId);

            var self = this,
                deferred = $q.defer();

            Store.deleteRecipe(recipeId).then(function() {
                //Remove recipe from cache.
                if (isCacheUser.call(self, userId))
                    self.cache.recipes.remove(recipeId);

                //Will it cause confusion returning this from delete?
                deferred.resolve(self.cache.recipes.values());
            });

            return deferred.promise;
        };

        UserStore.prototype.getCurrentUserRecipes = function() {
            var self = this,
                deferred = $q.defer();

            //If we've already fetched user data, then just return from cached data.
            if (this.cache.isFetched)
                deferred.resolve(this.cache.recipes.values());
            else
                Store.getCurrentUserRecipes().then(function(data) {
                    self.cache.recipes.import(data,
                        function(recipe) { return recipe.id; },
                        function(recipe) { return ObjectMapper.map(recipe, ObjectMapper.BACKEND_ARTIFACT); });

                    self.cache.isFetched = true;

                    deferred.resolve(data);
                });

            return deferred.promise;
        };

        //Should this be getCurrentUserRecipeById?
        UserStore.prototype.getRecipeById = function(recipeId) {
            recipeId = Number(recipeId);

            //Need to expand this to check if we have a cached copy and fetching otherwise.
            var recipe = this.cache.recipes.findFirst(function(r) { return r.key === recipeId; });

            return recipe == null ? recipe : recipe.value;
        };

        function initCache(userId) {
            return {
                id: userId,
                recipes: new ClassFactory.Lookup(false),
                isFetched: false
            };
        }

        function isCacheUser(userId) {
            return this.cache && this.userId === userId;
        }

        return UserStore;
    }
})();