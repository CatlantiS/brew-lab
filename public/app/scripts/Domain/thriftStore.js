(function() {
    'use strict';

    //Caches for current user to save trips to the backend.  *Saves*, hence thrift store.  Get it?
    angular.module('brewApp.services')
        .factory('ThriftStore', ['$q', 'Configuration', 'ClassFactory', 'ObjectMapper', 'Store', thriftStore]);

    function thriftStore($q, Configuration, ClassFactory, ObjectMapper, Store) {
        var ThriftStore = function(userId) {
            this.userId = userId;
            this.session = Configuration.currentUser.cacheRecipes ? initSession(userId) : null;
        };

        //Not true prototype inheritance.
        ThriftStore.prototype = Object.create(Store);

        ThriftStore.prototype.saveRecipe = function(recipe) {
            var self = this,
                deferred = $q.defer();

            Store.saveRecipe(recipe).then(function(data) {
                //Mark recipe as added and add to cache.
                if (isSessionUser.call(self, recipe.userId)) {
                    recipe.added = true;

                    self.session.data.recipes.add(data.id, recipe);
                }

                recipe.id = data.id;

                deferred.resolve(data);
            });

            return deferred.promise;
        };

        ThriftStore.prototype.deleteRecipe = function(recipeId, userId) {
            recipeId = Number(recipeId);

            var self = this,
                deferred = $q.defer();

            Store.deleteRecipe(recipeId).then(function() {
                //Remove recipe from cache.
                if (isSessionUser.call(self, userId))
                    self.session.data.recipes.remove(recipeId);

                //Will it cause confusion returning this from delete?
                deferred.resolve(self.session.data.recipes.values());
            });

            return deferred.promise;
        };

        ThriftStore.prototype.getCurrentUserRecipes = function() {
            var self = this,
                deferred = $q.defer();

            //If we've already fetched user data, then just return from cached data.
            if (this.session.data.isFetched)
                deferred.resolve(this.session.data.recipes.values());
            else
                Store.getCurrentUserRecipes().then(function(data) {
                    self.session.data.recipes.import(data,
                        function(recipe) { return recipe.id; },
                        function(recipe) { return ObjectMapper.mapper.map(recipe, 'BackendArtifact'); });

                    self.session.data.isFetched = true;

                    deferred.resolve(data);
                });

            return deferred.promise;
        };

        //Should this be getCurrentUserRecipeById?
        ThriftStore.prototype.getRecipeById = function(recipeId) {
            recipeId = Number(recipeId);

            //Need to expand this to check if we have a cached copy and fetching otherwise.
            var recipe = this.session.data.recipes.findFirst(function(r) { return r.key === recipeId; });

            return recipe == null ? recipe : recipe.value;
        };

        function initSession(userId) {
            var data = {
                recipes: new ClassFactory.Lookup(false),
                isFetched: false
            };

            return {
                id: userId,
                data: data
            };
        }

        function isSessionUser(userId) {
            return this.session && this.userId === userId;
        }

        return ThriftStore;
    }
})();