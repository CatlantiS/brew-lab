'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$scope', 'User', myRecipesController]);

function myRecipesController($scope, User) {
    /* jshint validthis: true */
    var self = this;

    $scope.loadData = function() {
        return User.getRecipes().then(function(recipes) {
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
