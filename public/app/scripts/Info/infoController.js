(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('InfoCtrl', infoController);

    function infoController() {
        /* jshint validthis: true */
        var self = this;

        self.app = {
            version: '%APPVERSION%'
        };
    }
})();