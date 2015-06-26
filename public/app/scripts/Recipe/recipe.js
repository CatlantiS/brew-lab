(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Recipe', ['$q', 'User', 'Store', recipe]);

    function recipe($q, User, Store) {
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

            if (User.context.recipes && reload === false) {
                _recipes = User.context.recipes;

                deferred.resolve(User.context.recipes);
            }
            else
                User.context.getRecipes().then(function(recipes) {
                    _recipes = recipes;

                    deferred.resolve(recipes);
                });

            return deferred.promise;
        }

        return {
            recipes: _recipes,
            save: save,
            getRecipes: getRecipes
        };
    }
})();
