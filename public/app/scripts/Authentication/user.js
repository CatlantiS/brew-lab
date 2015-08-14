(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'Store', user]);

    //Obviously need to actually implement this.
    function user($resource, Store) {
        var id = '1',
            context = {
                getRecipes: getRecipes
            };

        function getRecipes() {
            return Store.getRecipesByUserId(id).then(function(recipes) {
                return recipes;
            });
        }

        var isAuthenticated = false;

        return {
            id: id,
            recipes: getRecipes,
            isAuthenticated: isAuthenticated
        };
    }
})();