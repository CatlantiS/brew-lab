'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$scope', 'Recipe', myRecipesController]);

function myRecipesController($scope, Recipe) {
    /* jshint validthis: true */
    var self = this;

    self.recipes = [];

    $scope.loadData = function() {
        self.isLoading = true;

        return Recipe.getRecipes().then(function(recipes) {
            self.isLoading = false;

            return options = {
                data: recipes.map(function(recipe) {
                    return [recipe.name, '', '', ''];
                }),
                columns: [
                    { title: 'Name' },
                    { title: 'Volume' },
                    { title: 'Units' },
                    { title: 'Yeast' }
                ]
            };
        });
    };
};
