//Could've used the same controller for add and edit, but figured it would be cleaner to keep them separate even though there is redundancy.

'use strict';

angular.module('brewApp.controllers')
    .controller('EditRecipeCtrl', ['$modalInstance', 'BrewMaster', 'logger', 'notifications', 'UserStore', '$modalParams', editRecipeController]);

function editRecipeController($modalInstance, BrewMaster, logger, notifications, UserStore, $modalParams) {
    /* jshint validthis: true */
    var self = this, original = {};

    self.INGREDIENT_TYPE = { HOPS: 'hops', MALT: 'malt', YEAST: 'yeast' };

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

    self.addIngredient = function(type, ingredient) {
        (self.recipe[type] = self.recipe[type] || []).push(ingredient);

        //This is pretty brittle.
        self.current[type] = null;
    };

    self.deleteIngredient = function(type, ingredient) {
        var index = self.recipe[type]
            .map(function(i) { return i.name; })
            .indexOf(ingredient.name);

        self.recipe[type].splice(index, 1);
    };

    self.update = function(isValid) {
        self.recipe.ingredients = self.recipe.ingredients || [];

        for (var key in self.INGREDIENT_TYPE) {
            var type = self.INGREDIENT_TYPE[key];

            if (self.recipe[type] && self.recipe[type].length > 0)
                for (var i = 0; i < self.recipe[type].length; i++) {
                    var ingredient = self.recipe[type][i];
                    ingredient.type = type;

                    self.recipe.ingredients.push(ingredient);
                }
        }

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
