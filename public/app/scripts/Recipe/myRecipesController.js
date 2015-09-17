(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['$q', 'User', myRecipesController]);

    function myRecipesController($q, User) {
        /* jshint validthis: true */
        var self = this;

        self.isLoading = false;

        self.getMyRecipes = function() {
            var deferred = $q.defer();

            self.isLoading = true;

            User.getRecipes().then(function(recipes) {
                self.isLoading = false;

                self.recipes = recipes;

                deferred.resolve(recipes);
            });

            return deferred.promise;
        }

        self.editRecipe = function(id) {
            alert('Edit ' + id);
        };

        self.deleteRecipe = function(id) {
            User.deleteRecipe(id).then(function(recipes) {
                self.recipes = recipes;
            });
        };
    };
})();

