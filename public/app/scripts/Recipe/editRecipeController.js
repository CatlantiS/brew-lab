//Could've used the same controller for add and edit, but figured it would be cleaner to keep them separate even though there is redundancy.

'use strict';

angular.module('brewApp.controllers')
    .controller('EditRecipeCtrl', ['AppState', 'BrewMaster', 'notifications', 'logger', 'User', editRecipeController]);

function editRecipeController(AppState, BrewMaster, notifications, logger, User) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('EditRecipe').recipe || {};

    self.units = BrewMaster.units;

    self.yeastTypes = BrewMaster.yeastTypes;

    self.update = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            User.saveRecipe(self.recipe).then(function(data) {
                notifications.success('Recipe ' + self.recipe.name + ' saved.');
                logger.info('Recipe ' + data.id + ' saved.');

                self.recipeForm.$setPristine();
                self.recipe = {};

                AppState.area('EditRecipe').remove('recipe');
            });
        }
    };

    self.clear = function() {
        self.recipeForm.$setPristine();
        self.recipe = {};

        AppState.area('EditRecipe').remove('recipe');
    };
}
