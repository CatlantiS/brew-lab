'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$scope', 'beerInfoService', recipeController]);

function recipeController($scope, beerInfoService) {
    $scope.recipe = {};

    $scope.yeastTypes = beerInfoService.yeastTypes;
};