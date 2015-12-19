(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$q', 'Auth', 'UserStore', user]);

    function user($q, Auth, UserStore) {
        function User() { getCurrentUser.call(this); }

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
            if (this.id) return UserStore.deleteRecipe(recipeId, this.id);
            else {
                var deferred = $q.defer();

                getCurrentUser.call(this).then(function(currentUser) {
                    deferred.resolve(UserStore.deleteRecipe(recipeId, currentUser.id));
                });

                return deferred.promise;
            }
        };

        function getCurrentUser() {
            var self = this, deferred = $q.defer();

            if (!Auth.isAuthenticated()) return (deferred.reject('User is not authenticated'), deferred.promise);

            UserStore.getCurrentUser().then(function(data) {
                self.id = data.id;

                deferred.resolve(data);
            });

            return deferred.promise;
        }

        return new User();
    }
})();