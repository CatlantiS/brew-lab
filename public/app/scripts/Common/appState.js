(function() {
    'use strict';

    //Use local storage?
    angular.module('brewApp.services').factory('AppState', ['ClassFactory', appState]);

    function appState(ClassFactory) {
        var state = {};

        function area(area) {
            return (state[area] = state[area] || { store: new ClassFactory.Lookup()}, state[area]);
        }

        return {
            area: area
        };
    }
})();