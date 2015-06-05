'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', '$modalInstance', recipeController]);

//Not liking this guy having to know about $modalInstance.
function recipeController($scope, AppState, BrewMaster, $modalInstance) {
    //Might not need to worry about stupid AppState, just depends on how the UI will look.
    $scope.recipe = AppState.area('Recipe').recipe || {};

    $scope.yeastTypes = BrewMaster.yeastTypes;

    $scope.submit = function(recipe) {
        AppState.area('Recipe').destroy('recipe');

        $modalInstance.close();
    };

    $scope.cancel = function() {
        if ($scope.recipeForm.$dirty)
            AppState.area('Recipe').recipe = $scope.recipe;

        $modalInstance.dismiss('cancel');
    }
}
;