'use strict';

angular.module('brewApp.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'Store', 'logger', 'User', recipeController]);

function recipeController($scope, AppState, BrewMaster, notifications, Store, logger, User) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about stupid AppState, just depends on how the UI will look.
    self.recipe = AppState.area('Recipe').recipe || {};

    self.yeastTypes = BrewMaster.yeastTypes;

    self.submit = function(isValid) {
        if (isValid) {
            recipe.user = User.id;

            //Need a spinner on this?
            Store.store(self.recipe).then(function (data) {
                notifications.success('You just added recipe ' + data.id + ', good job brah');
                logger.info('saved recipe with id = ' + data.id);

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
        if (self.recipeForm && self.recipeForm.$dirty)
            AppState.area('Recipe').recipe = self.recipe;
    });

    $scope.$on('dropdownClicked', function(event, ui) {
        if ($(ui.element).is('#recipeUnits'))
            self.recipe.units = ui.selectedValue;
    });
}
