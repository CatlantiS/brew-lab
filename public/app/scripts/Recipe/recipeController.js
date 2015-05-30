'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$scope', 'BrewMaster', recipeController]);

function recipeController($scope, BrewMaster) {
    $scope.recipe = {};

    $scope.yeastTypes = BrewMaster.yeastTypes;
};