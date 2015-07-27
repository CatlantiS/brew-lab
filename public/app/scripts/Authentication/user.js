(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$resource', 'Store', user]);

    //Obviously need to actually implement this.
    function user($resource, Store) {
        var id = 'dudeBruhson',
            context = {
                getRecipes: getRecipes
            };

        function getRecipes() {
            return Store.getByUser(id).then(function(recipes) {
                return recipes;
            });
        }

        function All() {
            var userList = $resource('/api/v1/user/list').query();

            return userList.$promise;
        }

        var isAuthenticated = false;

        return {
            id: id,
            recipes: getRecipes,
            isAuthenticated: isAuthenticated,
            All: All
        };
    }
})();
