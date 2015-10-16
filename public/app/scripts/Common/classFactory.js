(function() {
    'use strict';

    angular.module('brewApp.services').factory('ClassFactory', classFactory);

    function classFactory() {
        return {
            Lookup: molar.class.Lookup,
            ObjectMapper: molar.class.ObjectMapper,
            MapperDefinition: molar.class.MapperDefinition
        };
    }
})();
