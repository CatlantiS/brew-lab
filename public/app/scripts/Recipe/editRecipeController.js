//Can refactor to eliminate redundancy between this and the add recipe controller.
(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('EditRecipeCtrl', ['$modalInstance', 'BrewMaster', 'logger', 'notifications', 'UserStore', '$modalParams', editRecipeController]);

    function editRecipeController($modalInstance, BrewMaster, logger, notifications, UserStore, $modalParams) {
        /* jshint validthis: true */
        var self = this;

        self.INGREDIENT_TYPE = { HOPS: 'hops', MALT: 'malt', YEAST: 'yeast' };

        self.isIngredientsCollapsed = true;

        UserStore.getCurrentUserRecipeById($modalParams.id).then(function(recipe) {
            self.recipe = angular.copy(recipe);

            UserStore.getRecipeIngredientsByRecipeId($modalParams.id).then(function(ingredients) {
                //Break out ingredients by type for UI.
                if (ingredients && ingredients.length > 0) {
                    self.ingredients = [];

                    for (var i = 0; i < ingredients.length; i++)
                        (self.ingredients[ingredients[i].type] = self.ingredients[ingredients[i].type] || []).push(ingredients[i]);
                }
            });
        });

        BrewMaster.getDefinitions().then(function(definitions) {
            self.units = definitions.units.volume.map(function(def) { return def.name; });

            if (BrewMaster.hasIngredient(definitions, 'yeast'))
                self.yeasts = definitions.ingredient.yeast.map(function(def) { return def.name; });
        });

        self.addIngredient = function(type, ingredient) {
            (self.ingredients[type] = self.ingredients[type] || []).push(ingredient);

            //This is pretty brittle.
            self.current[type] = null;
        };

        self.deleteIngredient = function(type, ingredient) {
            var index = self.ingredients[type]
                .map(function(i) { return i.name; })
                .indexOf(ingredient.name);

            self.ingredients[type].splice(index, 1);
        };

        self.isIngredientValid = function(ingredient) {
            return !(ingredient == null || ingredient.name == null || ingredient.name.trim() == '' ||
            (ingredient.volume != null && ingredient.units == null));
        };

        self.update = function(isValid) {
            if (isValid) {
                self.recipe.ingredients = self.recipe.ingredients || [];

                for (var key in self.INGREDIENT_TYPE) {
                    if (!self.INGREDIENT_TYPE.hasOwnProperty(key)) continue;

                    var type = self.INGREDIENT_TYPE[key];

                    if (self.ingredients[type] && self.ingredients[type].length > 0)
                        for (var i = 0; i < self.ingredients[type].length; i++) {
                            var ingredient = self.ingredients[type][i];
                            ingredient.type = type;

                            self.recipe.ingredients.push(ingredient);
                        }
                }

                //Need a spinner on this?
                UserStore.updateRecipe(self.recipe).then(function() {
                    notifications.success('Recipe ' + self.recipe.name + ' updated.');
                    logger.info('Recipe ' + self.recipe.recipeId + ' updated.');

                    $modalInstance.close();
                });
            }
        };

        self.cancel = $modalInstance.dismiss;

        self.ingredientsCollapse = function() {
            self.isIngredientsCollapsed = !self.isIngredientsCollapsed;
        };
    }
})();