(function() {
    'use strict';

//Can get this stuff from a web service as well.
    angular.module('brewApp.services').service('BrewMaster', brewMaster);

    function brewMaster() {
        this.units = [
            'Gallons',
            'Liters'
        ];

        this.yeastTypes = [
            'American Ale',
            'Australian Ale',
            'British Ale',
            'Californian Ale',
            'Chico Ale',
            'Irish Ale',
            'Safale US-56 Ale Yeast (rehydrated)'
        ];
    }
})();