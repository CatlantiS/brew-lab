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

        function getRecipes() {
            return Store.getByUser(id).then(function(recipes) {
                return recipes;
            });
        }

        return {
            id: id,
            recipes: getRecipes
        };
    }
})();
