(function() {
    'use strict';

    angular.module('brewApp.services')
        .factory('User', ['$q', 'Store', user]);

    //Obviously need to actually implement this.
    function user($q, Store) {
        var id = 'dudeBruhson',
            context = {};

        function init() {
            context.recipes = getRecipes();
            context.reloadRecipes = getRecipes;
        }

        //Could just use promise handed back from $resource in Store, but this might be a cleaner.
        function getRecipes() {
            var deferred = $q.defer();

            Store.getByUser(id).then(function(recipes) {
                deferred.resolve(recipes);
            });

            return deferred.promise;
        }

        //Can call fetch in route resolve function to have context data before page loads.
        return {
            fetch: init,
            id: id,
            context: context
        }
    }
})();