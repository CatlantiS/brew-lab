'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$modalInstance', '$scope', 'BrewMaster', recipeController]);

//Not liking this guy having to know about $modalInstance.
function recipeController($modalInstance, $scope, BrewMaster) {
    $scope.recipe = {};

    $scope.yeastTypes = BrewMaster.yeastTypes;

    $scope.submit = function(recipe) {
        $modalInstance.dismiss('cancel');
    };
}
;