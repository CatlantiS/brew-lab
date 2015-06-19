'use strict';

angular.module('brewApp.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', recipeController]);

//Not liking this guy having to know about $modalInstance.
function recipeController($scope, AppState, BrewMaster, notifications) {

    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about stupid AppState, just depends on how the UI will look.
    self.recipe = AppState.area('Recipe').recipe || {};

    self.yeastTypes = BrewMaster.yeastTypes;

    self.submit = function(recipe) {
        //Actually make this do something.
        notifications.success('You just added a recipe, good job brah');
        self.recipeForm.$setPristine();
        self.recipe = {};
        AppState.area('Recipe').destroy('recipe');
    };

    self.clear = function() {
        self.recipeForm.$setPristine();
        self.recipe = {};
        AppState.area('Recipe').destroy('recipe');
    };

    //Why is this getting called twice?
    $scope.$on('$destroy', function() {
        if (self.recipeForm && self.recipeForm.$dirty)
            AppState.area('Recipe').recipe = self.recipe;
    });
};
