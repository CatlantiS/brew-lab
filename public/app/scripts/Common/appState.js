(function() {
    'use strict';

    //Use local storage?
    angular.module('brewApp.services').factory('AppState', ['ClassFactory', appState]);

    function appState(ClassFactory) {
        var state = {};

        function Area() { this.store = new ClassFactory.Lookup(); }

        //Do we need to do anything special to make sure delete is safe?
        Area.prototype.remove = function(key) { delete this[key]; return this; };

        function area(area) { return (state[area] = state[area] || new Area(), state[area]); }

        return { area: area };
    }
})();
