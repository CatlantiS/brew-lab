(function() {
    'use strict';

    angular.module('brewApp.services').factory('BrewMaster', ['$q', 'UserStore', brewMaster]);

    function brewMaster($q, UserStore) {
        var definitions,
            fetching;

        (function init() { getAllDefinitions(); })();

        function getAllDefinitions() {
            var deferred = $q.defer();

            //Wrap cached results in a promise for consistency and return immediately.
            if (definitions != null) {
                deferred.resolve(definitions);

                return deferred.promise;
            }

            //If already fetching, then return current promise, otherwise fetch and cache promise.  Don't want to execute multiple fetches before first one returns.
            return fetching || (function() {
                return fetching = UserStore.getBrewMasterDefinitions().then(function (data) {
                    definitions = {};

                    for (var property in data)
                        if (data.hasOwnProperty(property) && property[0] !== '$')
                            definitions[property] = data[property];

                    fetching = null;

                    return definitions;
                });
            })();
        }

        return {
            types: { UNITS: 'units', HOPS: 'hops', MALT: 'malt', YEAST: 'yeast' },
            getAllDefinitions: getAllDefinitions
        };
    }
})();