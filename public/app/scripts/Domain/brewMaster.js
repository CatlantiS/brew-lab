(function() {
    'use strict';

    angular.module('brewApp.services').factory('BrewMaster', ['$q', 'UserStore', brewMaster]);

    function brewMaster($q, UserStore) {
        var fetch = {};

        //Start fetching definitions right away.
        (function init() { getDefinitions(); })();

        function getDefinitions() {
            //If fetch has already been made...
            return fetch.definitions || (fetch.definitions = UserStore.getBrewMasterDefinitions(), fetch.definitions);
        }

        function hasIngredient(definitions, type) {
            type = type.toLowerCase();

            return definitions.ingredient != null &&
                angular.isArray(definitions.ingredient[type]) && definitions.ingredient[type].length > 0;
        }

        return {
            getDefinitions: getDefinitions,
            hasIngredient: hasIngredient
        };
    }
})();