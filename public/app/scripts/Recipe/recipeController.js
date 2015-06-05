'use strict';

angular.module('app.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', recipeController]);

//Not liking this guy having to know about $modalInstance.
function recipeController($scope, AppState, BrewMaster) {
    //Might not need to worry about stupid AppState, just depends on how the UI will look.
    $scope.recipe = AppState.area('Recipe').recipe || {};

    $scope.yeastTypes = BrewMaster.yeastTypes;

    $scope.submit = function(recipe) {
        //Actually make this do something.
        $scope.recipeForm.$setPristine();
        $scope.recipe = {};
        AppState.area('Recipe').destroy('recipe');
    };

    $scope.clear = function() {
        $scope.recipeForm.$setPristine();
        $scope.recipe = {};
        AppState.area('Recipe').destroy('recipe');
    };

    //Why is this getting called twice?
    $scope.$on('$destroy', function() {
        if ($scope.recipeForm && $scope.recipeForm.$dirty)
            AppState.area('Recipe').recipe = $scope.recipe;
    });
}
;