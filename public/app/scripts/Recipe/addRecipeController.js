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

            //A lot of redundancy in here.
            if (self.recipe.hops && self.recipe.hops.length > 0)
                for (var i = 0; i < self.recipe.hops.length; i++) {
                    var hops = self.recipe.hops[i];
                    hops.type = self.INGREDIENT_TYPE.HOPS;

                    self.recipe.ingredients.push(hops);
                }

            if (self.recipe.malt && self.recipe.malt.length > 0)
                for (i = 0; i < self.recipe.malt.length; i++) {
                    var malt = self.recipe.malt[i];
                    malt.type = self.INGREDIENT_TYPE.MALT;

                    self.recipe.ingredients.push(malt);
                }

            if (self.recipe.yeast && self.recipe.yeast.length > 0)
                for (i = 0; i < self.recipe.yeast.length; i++) {
                    var yeast = self.recipe.yeast[i];
                    yeast.type = self.INGREDIENT_TYPE.YEAST;

                    self.recipe.ingredients.push(yeast);
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
