'use strict';

angular.module('brewApp.controllers')
	.controller('RecipeCtrl', ['$scope', 'AppState', 'BrewMaster', 'notifications', 'Store', 'logger', recipeController]);

function recipeController($scope, AppState, BrewMaster, notifications, Store, logger) {
    /* jshint validthis: true */
    var self = this;

    //Might not need to worry about stupid AppState, just depends on how the UI will look.
    self.recipe = AppState.area('Recipe').recipe || {};

    self.yeastTypes = BrewMaster.yeastTypes;

    self.submit = function(recipe) {
        //Need a spinner on this?
        Store.store(recipe).then(function(data) {
            notifications.success('You just added recipe ' + data.id  + ', good job brah');
            self.recipeForm.$setPristine();
            self.recipe = {};
            AppState.area('Recipe').destroy('recipe');
        });
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
}
