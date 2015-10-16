(function() {
    'use strict';

    angular.module('brewApp.services').factory('ObjectMapper', ['ClassFactory', objectMapper]);

    function objectMapper(ClassFactory) {
        var mapper = new ClassFactory.ObjectMapper(),
            backendArtifact = new ClassFactory.MapperDefinition('BackendArtifact', true)
                .define('For fixing issues coming from the backend like numeric being serialized as string')
                .addMap('volume', 'volume', function(src) { return Number(src); });

        mapper.register(backendArtifact);

        return {
            mapper: mapper
        };
    }
})();
