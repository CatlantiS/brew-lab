(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['AppState', 'BrewModal', 'User', myRecipesController]);

    function myRecipesController(AppState, BrewModal, User) {
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
            User.getRecipeById(id).then(function(editRecipe) {
                AppState.area('Recipe').recipe = editRecipe;

                BrewModal.open({ controller: 'RecipeCtrl as ctrl', template: 'views/recipeModal', size: 'lg' });
            });
        };

        self.deleteRecipe = function(id) {
            User.deleteRecipe(id).then(function() {
                User.getRecipes().then(function(recipes) { self.recipes = recipes; });
            });
        };
    };
})();

