(function() {
    'use strict';

    //Caches for current user to save trips to the backend.  *Saves*, hence thrift store.  Get it?
    angular.module('brewApp.services')
        .factory('ThriftStore', ['$q', 'Configuration', 'Store', thriftStore]);

    function thriftStore($q, Configuration, Store) {
        var ThriftStore = function(userId) {
            this.userId = userId;
            this.session = Configuration.currentUser.cacheRecipes ? initSession(userId) : null;
        };

        //Not true prototype inheritance.
        ThriftStore.prototype = Object.create(Store);

        ThriftStore.prototype.saveRecipe = function(recipe) {
            var self = this,
                deferred = $q.defer();

            Store.saveRecipe(recipe).then(function(data) {
                if (isSessionUser.call(self, recipe.userId))
                    self.session.recipes.added.push(recipe);

                deferred.resolve(data);
            });

            return deferred.promise;
        }

        ThriftStore.prototype.getRecipesByUserId = function(userId) {
            var self = this,
                deferred = $q.defer();

            if (isSessionUser.call(this, userId) && this.session.recipes.isFetched)
                deferred.resolve(this.session.recipes.all());
            else
                Store.getRecipesByUserId(userId).then(function(data) {
                    if (isSessionUser.call(self, userId)) {
                        self.session.recipes.fetched = data;
                        self.session.recipes.isFetched = true;
                    }

                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function initSession(userId) {
            var recipes = {
                fetched: [],
                added: [],
                all: all,
                isFetched: false
            };

            //This isn't very efficient.
            function all() {
                return recipes.fetched.concat(recipes.added);
            }

            return {
                id: userId,
                recipes: recipes
            };
        }

        function isSessionUser(userId) {
            return this.session && this.userId === userId;
        }

        return ThriftStore;
    }
})();