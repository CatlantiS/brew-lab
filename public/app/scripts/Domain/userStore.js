(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('UserStore', ['$q', 'Auth', 'Factory', 'Configuration', 'Helper', 'ObjectMapper', 'Store', userStore]);

    function userStore($q, Auth, Factory, Configuration, Helper, ObjectMapper, Store) {
        var base = Store.prototype, fetch = {};

        function UserStore() {
            var self = this;

            Store.call(this);

            //Manage cache for authenticated user.  Is this really where we want to do this?
            Auth.onAuthenticate('UserStore', function() { self.cache = initCache(); });

            Auth.onSignOut('UserStore', function() { self.cache = null; });
        }

        UserStore.prototype = Object.create(base);

        UserStore.prototype.getCurrentUser = function() {
            //User hasn't logged in yet, so can't get current user info from backend.
            if (!Auth.isAuthenticated()) {
                var deferred = $q.defer();

                return (deferred.reject('User is not logged in.'), deferred.promise);
            }

            return fetch.currentUser || (fetch.currentUser = base.getCurrentUser(), fetch.currentUser);
        };

        UserStore.prototype.saveRecipe = function(recipe) {
            var self = this, deferred = $q.defer();

            if (!Auth.isAuthenticated())
                return (deferred.reject('User is not logged in.'), deferred.promise);

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

        UserStore.prototype.updateRecipe = function(recipe) {
            if (!Auth.isAuthenticated())
                return (deferred.reject('User is not logged in.'), deferred.promise);

            if (this.cache) {
                //If we are handed in a copy of the original recipe, then we need to update the original to keep the cache consistent.
                //There must be a better way of doing this.
                var original = this.cache.recipes.findFirst(function(r) { return r.key === +recipe.recipeId; });

                if (original && original.value != null && original.value !== recipe)
                    Helper.mapObj(recipe, original.value);
            }

            return base.updateRecipe.call(self, recipe);
        };

        UserStore.prototype.deleteRecipe = function(recipeId) {
            var self = this, deferred = $q.defer();

            if (!Auth.isAuthenticated())
                return (deferred.reject('User is not logged in.'), deferred.promise);

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

            if (!Auth.isAuthenticated())
                return (deferred.reject('User is not logged in.'), deferred.promise);

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

            if (!Auth.isAuthenticated())
                return (deferred.reject('User is not logged in.'), deferred.promise);

            recipeId = +recipeId; //Convert to number just in case we get handed a string.

            if (self.cache) {
                //Need to expand this to check if we have a cached copy and fetching otherwise.
                recipe = self.cache.recipes.findFirst(function(r) { return r.key === recipeId; });
                recipe = recipe == null ? recipe : recipe.value;

                if (recipe) return (deferred.resolve(recipe), deferred.promise);
            }

            base.getCurrentUserRecipeById.call(self, recipeId).then(function(data) {
                recipe = ObjectMapper.map(data, ObjectMapper.BACKEND_ARTIFACT);

                if (self.cache) self.cache.recipes.add(recipeId, recipe);

                deferred.resolve(recipe);
            });

            return deferred.promise;
        };

        function initCache() {
            return Configuration.currentUser.cacheRecipes ? {
                recipes: new Factory.Lookup(false),
                isFetched: false
            } : null;
        }

        //Return new instance and not constructor because we want the user store to be a singleton and only have one instance caching user data.
        return new UserStore();
    }
})();
