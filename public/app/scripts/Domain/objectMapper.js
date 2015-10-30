(function() {
    'use strict';

    angular.module('brewApp.services').factory('ObjectMapper', ['ClassFactory', objectMapper]);

    function objectMapper(ClassFactory) {
        var BACKEND_ARTIFACT = 'BackendArtifact',
            mapper = new ClassFactory.ObjectMapper(),
            backendArtifact = new ClassFactory.MapperDefinition(BACKEND_ARTIFACT, true)
                .define('For fixing issues coming from the backend like numeric being serialized as string')
                .addMap('volume', 'volume', function(src) { return +src; });

        mapper.register(backendArtifact);

        return {
            map: function(source, definitionName) { return mapper.map(source, definitionName); },
            BACKEND_ARTIFACT: BACKEND_ARTIFACT
        };
    }
})();
