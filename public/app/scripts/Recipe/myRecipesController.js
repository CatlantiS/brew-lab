(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['User', myRecipesController]);

    function myRecipesController(User) {
        /* jshint validthis: true */
        var self = this;

        self.isLoading = false;

        self.getMyRecipes = function() {
            self.isLoading = true;

            return User.getRecipes().then(function(recipes) {
                self.isLoading = false;

                self.recipes = recipes;

                return recipes;
            });
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

