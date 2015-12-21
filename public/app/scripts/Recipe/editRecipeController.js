//Could've used the same controller for add and edit, but figured it would be cleaner to keep them separate even though there is redundancy.

'use strict';

angular.module('brewApp.controllers')
    .controller('EditRecipeCtrl', ['$modalInstance', 'AppState', 'BrewMaster', 'notifications', 'logger', 'UserStore', editRecipeController]);

function editRecipeController($modalInstance, AppState, BrewMaster, notifications, logger, UserStore, id) {
    /* jshint validthis: true */
    var self = this;

    //Todo: remove persistence from edit form.

    BrewMaster.getDefinitions().then(function(definitions) {
        self.units = definitions.units.volume.map(function(def) { return def.name; });

        if (BrewMaster.hasIngredient(definitions, 'yeast'))
            self.yeastTypes = definitions.ingredient.yeast.map(function(def) { return def.name; });
    });

    self.update = function(isValid) {
        if (isValid) {
            //Need a spinner on this?
            UserStore.updateRecipe(self.recipe).then(function() {
                notifications.success('Recipe ' + self.recipe.name + ' updated.');
                logger.info('Recipe ' + self.recipe.recipeId + ' updated.');

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

        $modalInstance.dismiss();
    };
}
