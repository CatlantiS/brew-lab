'use strict';

angular.module('brewApp.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'logger', 'User', recipeController]);

function recipeController($scope, AppState, BrewMaster, notifications, logger, User) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('Recipe').recipe || {};

    self.units = BrewMaster.units;

    self.yeastTypes = BrewMaster.yeastTypes;

    self.submit = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            User.saveRecipe(self.recipe).then(function(data) {
                notifications.success('Recipe ' + self.recipe.name + ' saved.');
                logger.info('Recipe ' + data.id + ' saved.');

                self.recipeForm.$setPristine();
                self.recipe = {};

                AppState.area('Recipe').destroy('recipe');
            });
        }
    };

    self.clear = function() {
        self.recipeForm.$setPristine();
        self.recipe = {};

        AppState.area('Recipe').destroy('recipe');
    };

    $scope.$on('$destroy', function() {
        //Only persist recipe if it exists and isn't empty.
        if (self.recipe && !angular.equals({}, self.recipe))
            AppState.area('Recipe').recipe = self.recipe;
    });
}
