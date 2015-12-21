(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('UserStore', ['$q', 'Auth', 'ClassFactory', 'Configuration', 'ObjectMapper', 'Store', userStore]);

    function userStore($q, Auth, ClassFactory, Configuration, ObjectMapper, Store) {
        var base = Store.prototype, fetch = {};

        function UserStore() {
            Store.call(this);

            this.cache = Configuration.currentUser.cacheRecipes ? initCache() : null;
        }

        UserStore.prototype = Object.create(base);

        UserStore.prototype.getCurrentUser = function() {
            //User hasn't logged in yet, so can't get current user info from backend.
            if (!Auth.isAuthenticated()) {
                var deferred = $q.defer();

                return (deferred.reject('User has not authenticated'), deferred.promise);
            }

            return fetch.currentUser || (fetch.currentUser = base.getCurrentUser(), fetch.currentUser);
        };

        UserStore.prototype.saveRecipe = function(recipe) {
            var self = this, deferred = $q.defer();

            base.saveRecipe.call(self, recipe).then(function(data) {
                var recipeId = +data.recipeId; //Convert to number just in case we get handed a string.

                if (self.cache) {
                    recipe.recipeId = recipeId;
                    recipe.added = true;

                    self.cache.recipes.add(recipeId, recipe);
                }

                deferred.resolve(recipeId);
            });

            return deferred.promise;
        };

        UserStore.prototype.deleteRecipe = function(recipeId) {
            var self = this, deferred = $q.defer();

            base.deleteRecipe.call(self, recipeId).then(function() {
                self.getCurrentUser().then(function(currentUser) {
                    if (self.cache) {
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
            var self = this, deferred = $q.defer();

            //If we've already fetched user data, then just return from cached data.
            if (self.cache && self.cache.isFetched)
                deferred.resolve(self.cache.recipes.values());
            else
                base.getCurrentUserRecipes.call(self).then(function(data) {
                    if (self.cache) {
                        self.cache.recipes.import(data,
                            function (recipe) {
                                return +recipe.recipeId; //Convert to number just in case we get handed a string.
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
            var self = this, deferred = $q.defer(), recipe;

            recipeId = +recipeId; //Convert to number just in case we get handed a string.

            if (self.cache) {
                //Need to expand this to check if we have a cached copy and fetching otherwise.
                recipe = self.cache.recipes.findFirst(function(r) { return r.key === recipeId; });
                recipe = recipe == null ? recipe : recipe.value;

                if (recipe) {
                    deferred.resolve(recipe);

                    return deferred.promise;
                }
            }

            base.getCurrentUserRecipeById.call(self, recipeId).then(function(data) {
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

        //Return new instance and not constructor because we want the user store to be a singleton and only have one instance caching user data.
        return new UserStore();
    }
})();
