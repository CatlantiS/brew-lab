(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['AppState', 'BrewModal', 'UserStore', myRecipesController]);

    function myRecipesController(AppState, BrewModal, UserStore) {
        /* jshint validthis: true */
        var self = this;

        self.isLoading = false;

        self.getMyRecipes = function() {
            self.isLoading = true;

            return UserStore.getCurrentUserRecipes().then(function(recipes) {
                self.isLoading = false;

                self.recipes = recipes;

                return recipes;
            }, function() { self.isLoading = false; });
        };

        self.editRecipe = function(id) {
            UserStore.getCurrentUserRecipeById(id).then(function(editRecipe) {
                AppState.area('EditRecipe').recipe = editRecipe;

                BrewModal.open({
                        controller: 'EditRecipeCtrl as ctrl',
                        template: 'views/editRecipe',
                        static: true,
                        class: 'brew-modal-window',
                        params: { id: id }
                    })
                    //When edit modal closes, blow away app state data.
                    .then(function() { self.getMyRecipes(); });
            });
        };

        self.deleteRecipe = function(id) {
            UserStore.deleteRecipe(id).then(function() {
                UserStore.getCurrentUserRecipes().then(function(recipes) { self.recipes = recipes; });
            });
        };

        (function init() {
            self.getMyRecipes();
        })();
    }
})();

