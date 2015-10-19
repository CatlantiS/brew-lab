(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$q', 'UserStore', user]);

    function user($q, UserStore) {
        var store = new UserStore();

        function User() {
            this.isAuthenticated = false;

            getCurrentUser.call(this);
        }

        User.prototype.getRecipes = function() {
            return store.getCurrentUserRecipes();
        };

        User.prototype.getRecipeById = function(recipeId) {
            return store.getCurrentUserRecipeById(recipeId);
        };

        User.prototype.saveRecipe = function(recipe) {
            return store.saveRecipe(recipe);
        };

        User.prototype.updateRecipe = function(recipe) {
            return store.updateRecipe(recipe);
        };

        User.prototype.deleteRecipe = function(recipeId) {
            if (this.id) return store.deleteRecipe(recipeId, this.id);
            else {
                var deferred = $q.defer();

                getCurrentUser.call(this).then(function(currentUser) {
                    deferred.resolve(store.deleteRecipe(recipeId, currentUser.id));
                });

                return deferred.promise;
            }
        };

        function getCurrentUser() {
            var self = this, deferred = $q.defer();

            store.getCurrentUser().then(function(data) {
                self.id = data.id;

                deferred.resolve(data);
            });

            return deferred.promise;
        }

        return new User();
    }
})();