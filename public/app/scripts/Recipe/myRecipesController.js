'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$scope', 'Recipe', myRecipesController]);

function myRecipesController($scope, Recipe) {
    /* jshint validthis: true */
    var self = this;

    $scope.loadData = function() {

        return Recipe.getRecipes().then(function(recipes) {

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
