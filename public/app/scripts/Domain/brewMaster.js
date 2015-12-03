(function() {
    'use strict';

    angular.module('brewApp.services').factory('BrewMaster', ['$q', 'UserStore', brewMaster]);

    function brewMaster($q, UserStore) {
        var fetch = {};

        //Start fetching definitions right away.
        (function init() { getDefinitions(); })();

        function getDefinitions() {
            //If fetch has already been made...
            if (fetch.definitions != null) return fetch.definitions;
            else return fetch.definitions = UserStore.getBrewMasterDefinitions();
        }

        return {
            getDefinitions: getDefinitions
        };
    }
})();