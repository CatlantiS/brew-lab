(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('Recipe', ['$q', 'CurrentUserStore','User', recipe]);

    function recipe($q, CurrentUserStore, User) {
        var _recipes = null;

        function save(recipe) {
            recipe.userId = recipe.userId || User.id;

            return CurrentUserStore.saveRecipe(recipe).then(function(id) {
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
                CurrentUserStore.getRecipesByUserId(User.id).then(function(recipes) {
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
