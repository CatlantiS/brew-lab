(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['Store', user]);

    //Obviously need to actually implement this.
    function user(Store) {
        var id = 'dudeBruhson',
            context = {};

        function init() {
            return getRecipes().then(function(recipes) {
                context.recipes = recipes;
                context.reloadRecipes = getRecipes;
            });
        }

        function getRecipes() {
            if (context.recipes) {
                console.log('returning context.recipes');
                return context.recipes;
            }
            return Store.getByUser(id);
        }

        return {
            init: init,
            recipes: getRecipes(),
            id: id,
            context: context
        }
    }
})();
