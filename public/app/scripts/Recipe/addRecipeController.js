'use strict';

angular.module('brewApp.controllers')
	.controller('AddRecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'logger', 'UserStore', addRecipeController]);

function addRecipeController($scope, AppState, BrewMaster, notifications, logger, UserStore) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('AddRecipe').recipe || {};

    BrewMaster.getDefinitions().then(function(definitions) {
        self.units = definitions.units.volume.map(function(def) { return def.name; });

        if (BrewMaster.hasIngredient(definitions, 'yeast'))
            self.yeasts = definitions.ingredient.yeast.map(function(def) { return def.name; });
    });

    self.addYeast = function(yeast) {
        (self.recipe.yeasts = self.recipe.yeasts || []).push(yeast);

        self.current.yeast = null;
    };

    self.deleteYeast = function(yeast) {
        var index = self.recipe.yeasts
            .map(function(y) { return y.name; })
            .indexOf(yeast.name);

        self.recipe.yeasts.splice(index, 1);
    };

    self.submit = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            UserStore.saveRecipe(self.recipe).then(function(data) {
                notifications.success('Recipe ' + self.recipe.name + ' saved.');
                logger.info('Recipe ' + data.recipeId + ' saved.');

                self.recipeForm.$setPristine();
                self.recipe = {};

                AppState.area('AddRecipe').remove('recipe');
            });
        }
    };

    self.clear = function() {
        self.recipeForm.$setPristine();
        self.recipe = {};

        AppState.area('AddRecipe').remove('recipe');
    };

    $scope.$on('$destroy', function() {
        //Only persist recipe if it exists and isn't empty.
        if (self.recipe && !angular.equals({}, self.recipe))
            AppState.area('AddRecipe').recipe = self.recipe;
    });
}
