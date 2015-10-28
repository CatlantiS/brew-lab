(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('UserStore', ['$q', 'Configuration', 'ClassFactory', 'ObjectMapper', 'Store', userStore]);

    function userStore($q, Configuration, ClassFactory, ObjectMapper, Store) {
        var currentUser;

        function UserStore() {
            this.cache = Configuration.currentUser.cacheRecipes ? initCache() : null;
        }

        //Not true prototype inheritance.
        UserStore.prototype = Object.create(Store);

        UserStore.prototype.getCurrentUser = function() {
            var deferred = $q.defer();

            if (currentUser)
                deferred.resolve(currentUser);
            else
                Store.getCurrentUser().then(function(data) {
                    currentUser = data;

                    deferred.resolve(currentUser);
                });

            return deferred.promise;
        };

        UserStore.prototype.saveRecipe = function(recipe) {
            var self = this,
                deferred = $q.defer();

            Store.saveRecipe(recipe).then(function(data) {
                if (self.cache) {
                    recipe.id = data.id;
                    recipe.added = true;

                    self.cache.recipes.add(recipe.id, recipe);
                }

                deferred.resolve(data);
            });

            return deferred.promise;
        };

        UserStore.prototype.deleteRecipe = function(recipeId, userId) {
            var self = this,
                deferred = $q.defer();

            Store.deleteRecipe(recipeId).then(function() {
                self.getCurrentUser().then(function(currentUser) {
                    if (self.cache && currentUser.id === userId) {
                        var removed = self.cache.recipes.remove(Number(recipeId));

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
                Store.getCurrentUserRecipes().then(function(data) {
                    if (self.cache) {
                        self.cache.recipes.import(data,
                            function (recipe) {
                                return recipe.id;
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

            if (this.cache) {
                recipeId = Number(recipeId);

                //Need to expand this to check if we have a cached copy and fetching otherwise.
                recipe = this.cache.recipes.findFirst(function(r) { return r.key === recipeId; });
                recipe = recipe == null ? recipe : recipe.value;

                if (recipe) {
                    deferred.resolve(recipe);

                    return deferred.promise;
                }
            }

            var self = this;

            Store.getCurrentUserRecipeById(recipeId).then(function(data) {
                recipe = ObjectMapper.map(data, ObjectMapper.BACKEND_ARTIFACT);

                if (self.cache) self.cache.recipes.add(recipe.id, recipe);

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
