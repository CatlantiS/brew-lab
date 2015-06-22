'use strict';

angular.module('brewApp.controllers')
    .controller('MyRecipesCtrl', ['$q', '$scope', 'Auth', 'Store', myRecipesController]);

function myRecipesController($q, $scope, User, Store) {
    /* jshint validthis: true */
    var self = this;

    self.recipes = [];

    self.isLoading = false;

    (function init() {
        self.getMyRecipes();
    })();

    //Can load this when app loads or can load it only when it's requested.  And can cache or have it load fresh each time.
    self.getMyRecipes = function() {
        self.isLoading = true;

        //Wrapping in promise to be safe.  This is kinda lazy though.  Should know by now if it's a promise or not.
        $q.when(User.context.recipes).then(function(recipes) {
            self.recipes = recipes;

            self.isLoading = false;
        });
    }
}
