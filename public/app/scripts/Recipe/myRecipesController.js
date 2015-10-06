(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['BrewModal', 'User', myRecipesController]);

    function myRecipesController(BrewModal, User) {
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
            BrewModal.open({ controller: 'RecipeCtrl', template: 'views/recipeModal', size: 'lg' });
        };

        self.deleteRecipe = function(id) {
            User.deleteRecipe(id).then(function(recipes) {
                self.recipes = recipes;
            });
        };
    };
})();

