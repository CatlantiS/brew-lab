'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$scope', 'Recipe', 'Version', myRecipesController]);

function myRecipesController($scope, Recipe, Version) {
    /* jshint validthis: true */
    var self = this;

    $scope.loadData = function() {
        return Recipe.getRecipes().then(function(recipes) {
            var recipe = new Version(recipes[0]);

            recipe.name = 'you blew it';

            delete recipe.name;

            alert(recipe.name);

            recipe.deleteProp('name');

            alert(recipe.name);

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
