(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('AddRecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'logger', 'UserStore', addRecipeController]);

    function addRecipeController($scope, AppState, BrewMaster, notifications, logger, UserStore) {
        /* jshint validthis: true */
        var self = this, appState = AppState.area('AddRecipe');

        self.INGREDIENT_TYPE = { HOPS: 'hops', MALT: 'malt', YEAST: 'yeast' };

        self.isIngredientsCollapsed = true;

        self.ingredientsCollapseText = 'expand';

        self.recipe = appState.recipe || {};

        self.ingredients = appState.ingredients || [];

        BrewMaster.getDefinitions().then(function(definitions) {
            self.units = definitions.units.volume.map(function(def) { return def.name; });

            if (BrewMaster.hasIngredient(definitions, 'yeast'))
                self.yeasts = definitions.ingredient.yeast.map(function(def) { return def.name; });
        });

        //Trying to do this generically but it kinda sucks.
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

        self.submit = function(isValid) {
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
                UserStore.saveRecipe(self.recipe).then(function(data) {
                    notifications.success('Recipe ' + self.recipe.name + ' saved.');
                    logger.info('Recipe ' + data.recipeId + ' saved.');

                    self.clear();
                });
            }
        };

        self.clear = function() {
            self.recipeForm.$setPristine();
            self.recipe = {};
            self.ingredients = [];

            appState.remove('recipe');
            appState.remove('ingredients');
        };

        self.ingredientsCollapse = function() {
            self.isIngredientsCollapsed = !self.isIngredientsCollapsed;

            self.ingredientsCollapseText = self.isIngredientsCollapsed ? 'expand' : 'collapse';
        };

        $scope.$on('$destroy', function() {
            //Only persist recipe if it exists and isn't empty.
            if (self.recipe && !angular.equals({}, self.recipe)) {
                appState.recipe = self.recipe;
                appState.ingredients = self.ingredients;
            }
        });
    }
})();