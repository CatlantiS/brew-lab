//Could've used the same controller for add and edit, but figured it would be cleaner to keep them separate even though there is redundancy.

'use strict';

angular.module('brewApp.controllers')
    .controller('EditRecipeCtrl', ['$modalInstance', 'BrewMaster', 'notifications', 'logger', 'UserStore', '$modalParams', editRecipeController]);

function editRecipeController($modalInstance, BrewMaster, notifications, logger, UserStore, $modalParams) {
    /* jshint validthis: true */
    var self = this;

    UserStore.getCurrentUserRecipeById($modalParams.id).then(function(recipe) {
        self.recipe = angular.copy(recipe);

        UserStore.getRecipeIngredientsByRecipeId($modalParams.id).then(function(ingredients) {
            //Break out ingredients by type for UI.
            if (ingredients && ingredients.length > 0)
                for (var i = 0; i < ingredients.length; i++)
                    (self.recipe[ingredients[i].type] = self.recipe[ingredients.type] || []).push(ingredients[i]);
        });
    });

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
