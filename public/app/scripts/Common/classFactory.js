(function() {
    'use strict';

    angular.module('brewApp.services').factory('ClassFactory', classFactory);

    function classFactory() {
        return {
            Lookup: molar.Lookup,
            ObjectMapper: molar.ObjectMapper,
            MapperDefinition: molar.MapperDefinition
        };
    }
})();
