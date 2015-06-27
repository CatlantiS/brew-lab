(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Recipe', ['$q', 'Store','User', recipe]);

    function recipe($q, Store, User) {
        var _recipes = null; //I suck so much ass at git.

        function save(recipe) {
            recipe.userId = recipe.userId || User.id;

            return Store.store(recipe).then(function(id) {
                getRecipes(true);

                return id;
            });
        }

        function getRecipes(reload) {
            var deferred = $q.defer();

            if (_recipes && reload === false) {
                deferred.resolve(_recipes);
            }
            else
               Store.getByUser(User.id).then(function(recipes) {
                    _recipes = recipes;

                    deferred.resolve(_recipes);
                });

            return deferred.promise;
        }

        return {
            save: save,
            getRecipes: getRecipes
        };
    }
})();
