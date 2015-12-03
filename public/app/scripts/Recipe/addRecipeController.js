'use strict';

angular.module('brewApp.controllers')
	.controller('AddRecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'logger', 'User', addRecipeController]);

function addRecipeController($scope, AppState, BrewMaster, notifications, logger, User) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('AddRecipe').recipe || {};

    BrewMaster.getDefinitions().then(function(definitions) {
        self.units = definitions.units.volume.map(function(def) { return def.name; });

        self.yeastTypes = definitions.ingredient.yeast.map(function(def) { return def.name; });
    });

    self.submit = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            User.saveRecipe(self.recipe).then(function(data) {
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
