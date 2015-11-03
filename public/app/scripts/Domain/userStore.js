(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('UserStore', ['$q', 'Configuration', 'ClassFactory', 'ObjectMapper', 'Store', userStore]);

    function userStore($q, Configuration, ClassFactory, ObjectMapper, Store) {
        var base = Store.prototype, currentUser;

        function UserStore() {
            this.cache = Configuration.currentUser.cacheRecipes ? initCache() : null;
        }

        UserStore.prototype = Object.create(base);

        UserStore.prototype.getCurrentUser = function() {
            var deferred = $q.defer();

            if (currentUser)
                deferred.resolve(currentUser);
            else
                base.getCurrentUser.call(this).then(function(data) {
                    currentUser = data;

                    deferred.resolve(currentUser);
                });

            return deferred.promise;
        };

        UserStore.prototype.saveRecipe = function(recipe) {
            var self = this,
                deferred = $q.defer();

            base.saveRecipe.call(this, recipe).then(function(data) {
                var recipeId = +data.id; //Convert to number just in case we get handed a string.

                if (self.cache) {
                    recipe.id = recipeId;
                    recipe.added = true;

                    self.cache.recipes.add(recipeId, recipe);
                }

                deferred.resolve(recipeId);
            });

            return deferred.promise;
        };

        UserStore.prototype.deleteRecipe = function(recipeId, userId) {
            var self = this,
                deferred = $q.defer();

            base.deleteRecipe.call(this, recipeId).then(function() {
                self.getCurrentUser().then(function(currentUser) {
                    if (self.cache && currentUser.id === userId) {
                        var removed = self.cache.recipes.remove(+recipeId); //Convert to number just in case we get handed a string.

                        //Will it cause confusion returning this only if user is cached?
                        deferred.resolve(removed);
                    }
                    else
                        deferred.resolve();
                });
            });

            return deferred.promise;
        };

        UserStore.prototype.getCurrentUserRecipes = function() {
            var self = this,
                deferred = $q.defer();

            //If we've already fetched user data, then just return from cached data.
            if (this.cache && this.cache.isFetched)
                deferred.resolve(this.cache.recipes.values());
            else
                base.getCurrentUserRecipes.call(this).then(function(data) {
                    if (self.cache) {
                        self.cache.recipes.import(data,
                            function (recipe) {
                                return +recipe.id; //Convert to number just in case we get handed a string.
                            },
                            function (recipe) {
                                return ObjectMapper.map(recipe, ObjectMapper.BACKEND_ARTIFACT);
                            });

                        self.cache.isFetched = true;
                    }

                    deferred.resolve(data);
                });

            return deferred.promise;
        };

        UserStore.prototype.getCurrentUserRecipeById = function(recipeId) {
            var deferred = $q.defer(), recipe;

            recipeId = +recipeId; //Convert to number just in case we get handed a string.

            if (this.cache) {
                //Need to expand this to check if we have a cached copy and fetching otherwise.
                recipe = this.cache.recipes.findFirst(function(r) { return r.key === recipeId; });
                recipe = recipe == null ? recipe : recipe.value;

                if (recipe) {
                    deferred.resolve(recipe);

                    return deferred.promise;
                }
            }

            var self = this;

            base.getCurrentUserRecipeById.call(this, recipeId).then(function(data) {
                recipe = ObjectMapper.map(data, ObjectMapper.BACKEND_ARTIFACT);

                if (self.cache) self.cache.recipes.add(recipeId, recipe);

                deferred.resolve(recipe);
            });

            return deferred.promise;
        };

        function initCache() {
            return {
                recipes: new ClassFactory.Lookup(false),
                isFetched: false
            };
        }

        return new UserStore();
    }
})();
