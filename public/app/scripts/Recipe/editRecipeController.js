//Could've used the same controller for add and edit, but figured it would be cleaner to keep them separate even though there is redundancy.

'use strict';

angular.module('brewApp.controllers')
    .controller('EditRecipeCtrl', ['$modalInstance', 'AppState', 'BrewMaster', 'notifications', 'logger', 'User', editRecipeController]);

function editRecipeController($modalInstance, AppState, BrewMaster, notifications, logger, User) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('EditRecipe').recipe || {};

    self.units = BrewMaster.units;

    self.yeastTypes = BrewMaster.yeastTypes;

    self.update = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            User.updateRecipe(self.recipe).then(function() {
                notifications.success('Recipe ' + self.recipe.name + ' updated.');
                logger.info('Recipe ' + self.recipe.id + ' updated.');

                self.recipeForm.$setPristine();
                self.recipe = {};

                AppState.area('EditRecipe').remove('recipe');

                $modalInstance.close();
            });
        }
    };

    self.cancel = function() {
        self.recipeForm.$setPristine();
        self.recipe = {};

        AppState.area('EditRecipe').remove('recipe');

        $modalInstance.dismiss();
    };
}
