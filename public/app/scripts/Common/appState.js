'use strict';

//There's probably a much better solution than this.
//Do we want to add the option to use local storage here?
angular.module('brewApp.services')
    .service('AppState', function() {
        var _state = {};

        var Area = function() {};

        Area.prototype.store = function(key, value) {
            this[key] = value;
        };

        Area.prototype.retrieve = function(key) {
            return this[key];
        };

        Area.prototype.destroy = function(key) {
            if (typeof this[key] !== 'undefined')
                delete this[key];
        };

        this.area = function(area) {
            _state[area] = _state[area] || new Area();

            return _state[area];
        };

        //Force callers to only use areas to store state and not store it directly on the service object.
        Object.freeze(this);
    });