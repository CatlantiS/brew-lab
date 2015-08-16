(function() {
    'use strict';

    //Caches for current user to save trips to the backend.
    angular.module('brewApp.services')
        .factory('CurrentUserStore', ['$q', '$resource', 'Configuration', 'Store', 'User', currentUserStore]);

    function currentUserStore($q, $resource, Configuration, Store, User) {
        var currentUser = Configuration.currentUser.cacheRecipes ? initCurrentUser(User) : null;

        var CurrentUserStore = function() {};

        //Not true prototype inheritance.
        CurrentUserStore.prototype = Object.create(Store);

        CurrentUserStore.prototype.saveRecipe = function(recipe) {
            var deferred = $q.defer();

            Store.saveRecipe(recipe).then(function(data) {
                if (isCurrentUser(recipe.userId))
                    currentUser.recipes.added.push(recipe);

                deferred.resolve(data);
            });

            return deferred.promise;
        }

        CurrentUserStore.prototype.getRecipesByUserId = function(userId) {
            var deferred = $q.defer();

            if (isCurrentUser(userId) && currentUser.recipes.isFetched)
                deferred.resolve(currentUser.recipes.all());
            else
                Store.getRecipesByUserId(userId).then(function(data) {
                    if (isCurrentUser(userId)) {
                        currentUser.recipes.fetched = data;
                        currentUser.recipes.isFetched = true;
                    }

                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function initCurrentUser(User) {
            var recipes = {
                fetched: [],
                added: [],
                all: all,
                isFetched: false
            };

            //This isn't very efficient.
            function all() {
                return recipes.fetched.concat(recipes.added);
            }

            return {
                id: User.id,
                recipes: recipes
            };
        }

        function isCurrentUser(userId) {
            return currentUser && currentUser.id === userId;
        }

        return new CurrentUserStore();
    }
})();