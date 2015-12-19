(function() {
    'use strict';

    angular.module('brewApp.controllers').controller('AppCtrl', ['Auth', appController]);

    function appController(Auth) {
        /* jshint validthis: true */
        var self = this;

        self.auth = Auth;
    }
})();
