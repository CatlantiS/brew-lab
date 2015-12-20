(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$q', 'Auth', 'UserStore', user]);

    function user($q, Auth, UserStore) {
        function User() { this.getCurrentUser(this); }

        User.prototype.getCurrentUser = function() {
            var self = this, deferred = $q.defer();

            if (!Auth.isAuthenticated()) return (deferred.reject('User is not authenticated'), deferred.promise);

            UserStore.getCurrentUser().then(function(data) {
                self.user = data;

                deferred.resolve(data);
            });

            return deferred.promise;
        }

        User.prototype.getRecipes = function() {
            return UserStore.getCurrentUserRecipes();
        };

        User.prototype.getRecipeById = function(recipeId) {
            return UserStore.getCurrentUserRecipeById(recipeId);
        };

        User.prototype.saveRecipe = function(recipe) {
            return UserStore.saveRecipe(recipe);
        };

        User.prototype.updateRecipe = function(recipe) {
            return UserStore.updateRecipe(recipe);
        };

        User.prototype.deleteRecipe = function(recipeId) {
            if (this.user.id) return UserStore.deleteRecipe(recipeId, this.user.id);
            else {
                var self = this, deferred = $q.defer();

                this.getCurrentUser().then(function() {
                    deferred.resolve(UserStore.deleteRecipe(recipeId, self.user.id));
                });

                return deferred.promise;
            }
        };

        return new User();
    }
})();