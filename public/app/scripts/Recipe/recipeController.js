'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$scope', 'BrewMaster', '$modalInstance', recipeController]);

//Not liking this guy having to know about $modalInstance.
function recipeController($scope, BrewMaster, $modalInstance) {
    $scope.recipe = {};

    $scope.yeastTypes = BrewMaster.yeastTypes;

    $scope.submit = function(recipe) {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
}
;