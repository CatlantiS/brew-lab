(function() {
    'use strict';

    angular.module('brewApp.services').factory('ClassFactory', classFactory);

    function classFactory() {
        return {
            Lookup: molar.class.Lookup
        };
    }
})();
