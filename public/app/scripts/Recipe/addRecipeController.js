'use strict';

angular.module('brewApp.controllers')
	.controller('AddRecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'logger', 'UserStore', addRecipeController]);

function addRecipeController($scope, AppState, BrewMaster, notifications, logger, UserStore) {
    /* jshint validthis: true */
    var self = this;

    self.INGREDIENT_TYPE = { HOPS: 'hops', MALT: 'malt', YEAST: 'yeast' };

    //Might not need to worry about AppState, just depends on how the UI will look.
    self.recipe = AppState.area('AddRecipe').recipe || {};

    BrewMaster.getDefinitions().then(function(definitions) {
        self.units = definitions.units.volume.map(function(def) { return def.name; });

        if (BrewMaster.hasIngredient(definitions, 'yeast'))
            self.yeasts = definitions.ingredient.yeast.map(function(def) { return def.name; });
    });

    //Trying to do this generically but it kinda sucks.
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

    self.submit = function(isValid) {
        if (isValid) {
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

            //Need a spinner on this?
            UserStore.saveRecipe(self.recipe).then(function(data) {
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
