(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['Store', user]);

    //Obviously need to actually implement this.
    function user(Store) {
        var id = 'dudeBruhson',
            context = {
                getRecipes: getRecipes
            };

        function init() {
            getRecipes();
        }

        function getRecipes() {
            return Store.getByUser(id).then(function(recipes) {
                context.recipes = recipes;

                return recipes;
            });
        }

        return {
            init: init,
            id: id,
            context: context,
            recipes: getRecipes
        };
    }
})();
