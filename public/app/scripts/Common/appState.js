(function() {
    'use strict';

    //Use local storage?
    angular.module('brewApp.services').factory('AppState', ['ClassFactory', appState]);

    function appState(ClassFactory) {
        var state = {};

        function Area() { this.store = new ClassFactory.Lookup(); return this; }

        Area.prototype.remove = function(key) {
            if (typeof this[key] !== 'undefined')
                delete this[key];
        };

        function area(area) {
            return (state[area] = state[area] || new Area(), state[area]);
        }

        return {
            area: area
        };
    }
})();