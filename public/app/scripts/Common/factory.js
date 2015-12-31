(function() {
    'use strict';

    angular.module('brewApp.services').factory('Factory', factory);

    function factory() {
        return {
            Lookup: molar.Lookup,
            ObjectMapper: molar.ObjectMapper,
            MapperDefinition: molar.MapperDefinition,
            Mutant: molar.Mutant
        };
    }
})();
