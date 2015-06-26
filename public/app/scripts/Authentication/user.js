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
                context.reloadRecipes = true;
            });
        }

        function getRecipes() {
            return Store.getByUser(id);
        }

        var getRecipes = function() {
            if (context.recipes && !context.reloadRecipes) {
                return context.recipes.$promise;
            }
            else
            {
                context.reloadRecipes = false;
                return Store.getByUser(id).$promise;
            }
        }

        return {
            init: init,
            recipes: getRecipes,
            id: id,
            context: context
        }
    }
})();
